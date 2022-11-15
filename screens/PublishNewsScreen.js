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

const PublishNewsScreen = ({ navigation }) => {
  const { token, newsUpdate, setNewsUpdate } = useContext(Context);
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  const [image, setImage] = useState(uploadDefaultUri);
  const [type, setType] = useState('image');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      lead: '',
      content: '',
    },
    mode: 'onBlur',
  });

  // Resets form inputs
  const resetForm = () => {
    setImage(uploadDefaultUri);
    setValue('title', '');
    setValue('lead', '')
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
          <TouchableOpacity style={styles.resetContainer}>
            <McIcons name="autorenew" size={32} color={colors.negative} />
          </TouchableOpacity>
          <Text style={styles.header}>Create news</Text>
          <TouchableOpacity
            style={styles.publishContainer}
            onPress={handleSubmit(onSubmit)}
          >
            <McIcons name="publish" size={32} color={colors.positive} />
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Text style={styles.selectImageText}>Select image cover</Text>
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
                    message: 'Please enter a title.',
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

            <View style={styles.contentContainer}>
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
                name="lead"
              />

              <ErrorMessage
                error={errors?.content}
                message={errors?.content?.message}
              />
            </View>

            <View style={styles.contentContainer}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Content is required for every articles.',
                  },
                  minLength: {
                    value: 3,
                    message: 'Content should have at least 3 characters.',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MultilineInput
                    name="Please enter the content here..."
                    textEntry={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    height={500}
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
  resetContainer: {
    position: 'absolute',
    left: '4%',
  },
  publishContainer: {
    position: 'absolute',
    right: '4%',
  },
  header: {
    marginVertical: '2%',
    textAlign: 'center',
    fontSize: fontSize.regular,
    fontWeight: 'bold',
    color: colors.dark_text,
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  imageContainer: {
    height: 250,
    width: '100%',
    marginBottom: 15,
    // backgroundColor: colors.primary,
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
    // backgroundColor: colors.primary,
  },
  image: {
    // zIndex: 2,
    width: "100%",
    height: "100%",
    // resizeMode: 'contain',
    // overflow: 'hidden',
    // aspectRatio: 1.5,
  },
});

export default PublishNewsScreen;
