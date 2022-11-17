// npx expo install expo-image-picker
// npx expo install expo-av
import React, { useCallback, useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import defaultImage from '../assets/images/blank_image.jpg';
import { FormInput, MultilineInput } from '../component/AppInputs';
import ErrorMessage from '../component/ErrorMessage';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { postNews } from '../services/NewsService';
import { Context } from '../contexts/Context';
import { useFocusEffect } from '@react-navigation/native';
import {useValue} from 'react-native-reanimated';

const PublishNewsScreen = ({ navigation }) => {
  const { token, newsUpdate, setNewsUpdate } = useContext(Context);
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  const [image, setImage] = useState(uploadDefaultUri);
  const [type, setType] = useState('image');
  const [item, setItem] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      op: '',
      content: '',
    },
    mode: 'onBlur',
  });

  // Passing data to preview
  const preview = (data) => {
    const value = {
      title: data.title,
      op: data.op,
      content: data.content,
      image: image,
    }
    setItem(value)
    console.log(item);
    // navigation.navigate("Preview", {news: item})
  }

  // Resets form inputs
  const resetForm = () => {
    setImage(uploadDefaultUri);
    setValue('title', '');
    setValue('op', '')
    setValue('content', '');
    setType('image');
  };

  // Picks image for news data
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setType(result.type);
    }
  };

  // Posting news to server
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('op', data.op);
    formData.append('content', data.content);

    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('newsPhoto', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });

    try {
      const response = await postNews(formData, token);
      if (response.status == 200) {
        Alert.alert('News added');
        setNewsUpdate(newsUpdate + 1);
        resetForm();
      }
    } catch (error) {
      console.log('Post news', error.message);
    }
  };

  // Resets form input when user is off screen
  useFocusEffect(
    useCallback(() => {
      return () => resetForm();
    }, [])
  );

  return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.light_background }}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topNavContainer}>
            <TouchableOpacity style={styles.resetContainer} onPress={resetForm}>
              <Text style={styles.reset}>Reset</Text>
              {/* <McIcons name="autorenew" size={32} color={colors.negative} /> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.previewContainer} onPress={
              handleSubmit(preview)
            }>
              <Text style={styles.preview}>Preview</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.publishContainer} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.publish}>Publish</Text>
              {/* <McIcons name="arrow-right-bold-box-outline" size={32} color={colors.positive} /> */}
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {/* <Text style={styles.selectImageText}>Cover image</Text> */}
              {type === 'image' ? (
                <>
                  <View style={styles.imageWrap}>
                    <TouchableOpacity onPress={pickImage}>
                      <Image source={{ uri: image }} style={styles.image} />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <Video
                  source={{ uri: image }}
                  style={styles.image}
                  useNativeControls={true}
                  resizeMode="cover"
                  onError={(err) => {
                    console.error('video', err);
                  }}
                />
              )}
            </View>

            <View style={styles.titleContainer}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'This field is required',
                  },
                  minLength: {
                    value: 3,
                    message: 'Title should have at least 3 characters.',
                  },
                  maxLength: {
                    value: 150,
                    message: 'Title cannot exceed 150 characters.',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MultilineInput
                    name="News title"
                    textEntry={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    textAlign="center"
                    // leftIcon="pencil-outline"
                  />
                )}
                name="title"
              />

              <ErrorMessage
                error={errors?.title}
                message={errors?.title?.message}
              />
            </View>

            <View style={styles.leadContainer}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Please have an opening paragraph',
                  },
                  minLength: {
                    value: 3,
                    message: 'Lead paragraph should have at least 3 characters.',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MultilineInput
                    name="Lead paragraph of the news..."
                    textEntry={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    height={200}
                    textAlign="top"
                    // leftIcon="file-document-edit-outline"
                  />
                )}
                name="op"
              />

              <ErrorMessage
                error={errors?.op}
                message={errors?.op?.message}
              />
            </View>

            <View style={styles.contentContainer}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'News content is required',
                  },
                  minLength: {
                    value: 3,
                    message: 'Content should have at least 3 characters.',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MultilineInput
                    name="Please enter news content here..."
                    textEntry={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    height={400}
                    textAlign="top"
                    // leftIcon="file-document-edit-outline"
                  />
                )}
                name="content"
              />

              <ErrorMessage
                error={errors?.content}
                message={errors?.content?.message}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  topNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 2,
  },
  resetContainer: {
    flex: 1,
  },
  reset: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.negative,
  },
  previewContainer: {
    flex: 1,
  },
  preview: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.primary,
  },
  publishContainer: {
    flex: 1,
  },
  publish: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.positive,
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  imageContainer: {
    width: '100%',
    marginBottom: 15,
    // borderWidth: 1,
  },
  selectImageText: {
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  imageWrap: {
    marginTop: 10,
    height: 200,
    // borderWidth: 1,
  },
  image: {
    // zIndex: 2,
    width: "100%",
    height: "100%",
  },
  // titleContainer:{
  //   borderWidth: 1,
  // },
  // leadContainer:{
  //   borderWidth: 1,
  // },
  // contentContainer:{
  //   borderWidth: 1,
  // },
});

export default PublishNewsScreen;
