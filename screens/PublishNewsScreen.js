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
import { deleteNews, postNews, useNews } from '../services/NewsService';
import { Context } from '../contexts/Context';
import { useFocusEffect } from '@react-navigation/native';
import { useValue } from 'react-native-reanimated';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { baseUrl, newsCategory } from '../utils/variables';

const PublishNewsScreen = ({ navigation, route = {} }) => {
  const { token, newsUpdate, setNewsUpdate, draft } = useContext(Context);
  const uploadDefaultUri = Image.resolveAssetSource(defaultImage).uri;
  const [image, setImage] = useState(uploadDefaultUri);
  const [type, setType] = useState('image');
  const [item, setItem] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const { postParagraphToNews } = useNews();

  // Testing multiple inputs
  const [extraInputs, setExtraInputs] = useState([]);

  const addExtraSection = () => {
    const _inputs = [...extraInputs];
    _inputs.push({
      key: '',
      image: uploadDefaultUri,
      imageType: 'image',
      imageDescription: '',
      content: '',
    });
    setExtraInputs(_inputs);
  };

  const removeSection = (key) => {
    const index = extraInputs.findIndex((it) => it.key == key);
    extraInputs.splice(index, 1);
    setExtraInputs((input) => input.filter((item) => item.key !== key));
  };

  const handleImage = async (key) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      const _imageInput = [...extraInputs];
      _imageInput[key].key = key;
      _imageInput[key].image = result.uri;
      _imageInput[key].imageType = result.type;
      setExtraInputs(_imageInput);
    }
  };
  const handleImageDescription = (input, key) => {
    const _descInput = [...extraInputs];
    _descInput[key].key = key;
    _descInput[key].imageDescription = input;
    setExtraInputs(_descInput);
  };
  const handleContent = (input, key) => {
    const _contentInput = [...extraInputs];
    _contentInput[key].key = key;
    _contentInput[key].content = input;
    setExtraInputs(_contentInput);
  };

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

  useEffect(() => {
    if (route.params != undefined) {
      setValue('title', route.params.news.news_title);
      setValue('op', route.params.news.news_op);
      setValue('content', route.params.news.news_content);
      if (route.params.paragraph.length > 0) {
        const _inputs = [...extraInputs];
        for (let item of route.params.paragraph) {
          _inputs.push({
            key: '',
            image: uploadDefaultUri,
            imageType: 'image',
            imageDescription: item.p_photo_description,
            content: item.p_content,
          });
          setExtraInputs(_inputs);
        }
      }
    }
  }, [draft]);

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
    navigation.navigate('Preview', {
      news: value,
      formData: formData,
      extraInputs: extraInputs,
    });
  };

  // Resets form inputs
  const resetForm = () => {
    setImage(uploadDefaultUri);
    setValue('title', '');
    setValue('op', '');
    setValue('content', '');
    setType('image');
    setExtraInputs([]);
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

  const pickOnlyImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    let keys = [];
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
      const response = await postNews(formData, token);
      if (response.status == 200) {
        for (let item of extraInputs) {
          const paragraph = new FormData();
          if (item.image.includes('file')) {
            const filename = item.image.split('/').pop();
            let fileExtension = filename.split('.').pop();
            fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

            paragraph.append('paragraphPhoto', {
              uri: item.image,
              name: filename,
              type: item.imageType + '/' + fileExtension,
            });
          }
          paragraph.append('type', item.imageType);
          paragraph.append('photoDescription', item.imageDescription);
          paragraph.append('content', item.content);
          postParagraphToNews(paragraph, parseInt(response.message));
          keys.push(item.key);
        }

        Alert.alert('News added');
        setNewsUpdate(newsUpdate + 1);
        resetForm();
        keys.map((key) => {
          removeSection(key);
        });
        keys = [];
      }
    } catch (error) {
      console.log('Post news', error.message);
    }
  };

  // Resets form input when user is off screen
  /* useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  ); */

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
          <TouchableOpacity
            style={styles.topButtonContainer}
            onPress={resetForm}
          >
            <View
              style={[
                styles.buttonTextContainer,
                { backgroundColor: colors.negative },
              ]}
            >
              <Text style={styles.reset}>Reset</Text>
            </View>
            <View style={styles.buttonIconBackground} />
            <View style={styles.buttonIconContainer}>
              <McIcons name="autorenew" size={24} color={colors.negative} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topButtonContainer}
            onPress={handleSubmit(preview)}
          >
            <View
              style={[
                styles.buttonTextContainer,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.preview}>Preview</Text>
            </View>
            <View style={styles.buttonIconBackground} />
            <View style={styles.buttonIconContainer}>
              <McIcons
                name="card-search-outline"
                size={24}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topButtonContainer}
            onPress={handleSubmit(onSubmit)}
          >
            <View
              style={[
                styles.buttonTextContainer,
                { backgroundColor: colors.positive },
              ]}
            >
              <Text style={styles.publish}>Publish</Text>
            </View>
            <View style={styles.buttonIconBackground} />
            <View style={styles.buttonIconContainer}>
              <McIcons
                name="file-upload-outline"
                size={24}
                color={colors.positive}
              />
            </View>
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
                  <TouchableOpacity onPress={pickOnlyImage}>
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
                onValueChange={(value) => setCategory(value)}
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
                  height={150}
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
                  height={250}
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

          <View style={styles.extraInputsSectionContainer}>
            {extraInputs.map((input, key) => (
              <View key={key + 1} style={styles.extraInputsContainer}>
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
                  <View style={styles.imageWrap}>
                    <TouchableOpacity onPress={() => handleImage(key)}>
                      <Image
                        source={{ uri: input.image }}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <MultilineInput
                  name="Media content description"
                  textEntry={false}
                  onChange={(text) => {
                    handleImageDescription(text, key);
                  }}
                  value={input.imageDescription}
                  textAlign="center"
                  marginBottom={20}
                />
                <MultilineInput
                  name="Extra paragraph... (optional)"
                  textEntry={false}
                  onChange={(text) => {
                    handleContent(text, key);
                  }}
                  value={input.content}
                  textAlign="top"
                  height={200}
                  marginBottom={10}
                />

                <TouchableOpacity
                  style={styles.removeSectionButton}
                  onPress={() => {
                    removeSection(key);
                  }}
                >
                  <Text style={styles.removeSection}>Remove section</Text>
                  <McIcons
                    name="selection-remove"
                    size={20}
                    color={colors.negative}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addSectionButton}
              onPress={() => {
                addExtraSection();
              }}
            >
              <Text style={styles.addSection}>Add new section</Text>
              <McIcons name="selection" size={20} color={colors.secondary} />
            </TouchableOpacity>
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
  topButtonContainer: {
    flex: 1,
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    margin: 5,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.light_grey,
    overflow: 'hidden',
  },
  buttonTextContainer: {
    paddingLeft: '10%',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  buttonIconBackground: {
    position: 'absolute',
    right: 0,
    height: '100%',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 22,
    borderLeftWidth: 22,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: colors.container,
    borderBottomColor: colors.container,
  },
  buttonIconContainer: {
    position: 'absolute',
    right: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reset: {
    marginLeft: '8%',
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.light_background,
  },
  preview: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.light_background,
  },
  publish: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.light_background,
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
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
  extraInputsSectionContainer: {
    marginVertical: 10,
  },
  extraInputsContainer: {
    marginBottom: 50,
  },
  removeSectionButton: {
    width: '50%',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: colors.negative,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeSection: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.negative,
    marginRight: 5,
  },
  addSectionButton: {
    width: '50%',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSection: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.secondary,
    marginRight: 5,
  },
});

export default PublishNewsScreen;
