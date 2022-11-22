// npx expo install expo-image-picker
// npx expo install expo-av
import React, { useCallback, useContext, useEffect, useState } from 'react';
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
  Switch,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import defaultImage from '../assets/images/blank_image.png';
import { FormInput, MultilineInput } from '../component/AppInputs';
import ErrorMessage from '../component/ErrorMessage';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import RNPickerSelect from 'react-native-picker-select';
import { deleteNews, postNews } from '../services/NewsService';
import { Context } from '../contexts/Context';
import { useFocusEffect } from '@react-navigation/native';
import { useValue } from 'react-native-reanimated';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { baseUrl, newsCategory } from '../utils/variables';

const PublishNewsScreen = ({ navigation, route = {} }) => {
  const { token, newsUpdate, setNewsUpdate } = useContext(Context);
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  const [image, setImage] = useState(uploadDefaultUri);
  const [type, setType] = useState('image');
  const [item, setItem] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  let isDraft = false;
  // Toggle switch
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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

  if (route.params !== undefined) {
    isDraft = route.params.isDraft;
  }
  useEffect(() => {
    if (isDraft === true) {
      setValue('title', route.params.news.news_title);
      setValue('op', route.params.news.news_op);
      setValue('content', route.params.news.news_content);
    }
  }, [isDraft]);

  // Passing data to preview
  const preview = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('op', data.op);
    formData.append('content', data.content);
    formData.append('draft', 1);

    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('newsPhoto', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });

    const value = {
      title: data.title,
      op: data.op,
      content: data.content,
      image: image,
      draft: 1,
    };
    navigation.navigate('Preview', { news: value, formData: formData });
  };

  // Resets form inputs
  const resetForm = () => {
    setImage(uploadDefaultUri);
    setValue('title', '');
    setValue('op', '');
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
    formData.append('draft', 0);

    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('newsPhoto', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });

    try {
      /*  if (isDraft === true) {
        const deleteDraftNews = await deleteNews(
          token,
          route.params.news.news_id
        );
        isDraft = false;
        console.log('delete', deleteDraftNews);
      } */
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
  // useFocusEffect(
  //   useCallback(() => {
  //     return () => resetForm();
  //   }, [])
  // );

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

          <TouchableOpacity
            style={styles.previewContainer}
            onPress={handleSubmit(preview)}
          >
            <Text style={styles.preview}>Preview</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.publishContainer}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.publish}>Publish</Text>
            {/* <McIcons name="arrow-right-bold-box-outline" size={32} color={colors.positive} /> */}
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View
              style={{
                borderTopWidth: 1,
                borderLeftWidth: 1,
                width: 20,
                height: 20,
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            ></View>
            <View
              style={{
                borderTopWidth: 1,
                borderRightWidth: 1,
                width: 20,
                height: 20,
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            ></View>
            <View
              style={{
                borderBottomWidth: 1,
                borderLeftWidth: 1,
                width: 20,
                height: 20,
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}
            ></View>
            <View
              style={{
                borderBottomWidth: 1,
                borderRightWidth: 1,
                width: 20,
                height: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            ></View>
            {type === 'image' ? (
              <>
                <View style={styles.imageWrap}>
                  <TouchableOpacity onPress={pickImage}>
                    {/*  {isDraft == true ? (
                      <Image
                        source={{
                          uri: `${`${baseUrl}/${route.params.news.photoName}`}`,
                        }}
                        style={styles.image}
                      />
                    ) : (
                      <Image source={{ uri: image }} style={styles.image} />
                    )} */}
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

          <View style={styles.newsOptionsContainer}>
            <View style={styles.categoryContainer}>
              <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{ label: 'News category', value: 'null' }}
                items={newsCategory}
              />
            </View>
            {/* <View style={styles.notificationContainer}>
                <Text style={styles.notification}>Notification</Text>
                <Switch
                  trackColor={{ false: colors.dark_grey, true: colors.secondary }}
                  thumbColor={isEnabled ? colors.nokia_blue : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View> */}
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

            <ErrorMessage error={errors?.op} message={errors?.op?.message} />
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
    marginVertical: 15,
    padding: 1,
  },
  imageWrap: {
    // height: 200,
    // borderWidth: 1,
  },
  image: {
    // zIndex: 2,
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
  },
  newsOptionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryContainer: {
    borderWidth: 1,
    borderColor: colors.light_grey,
    borderRadius: 5,
    width: '100%',
  },
  notificationContainer: {
    width: '50%',
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderWidth: 1,
  },
  notification: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.dark_text,
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
