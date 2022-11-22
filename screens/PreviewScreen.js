import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Input,
  TouchableOpacity,
  Icon,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import FormInput, {
  MultilineInput,
  MultilineInputNoBorder,
} from '../component/AppInputs';
import { SubmitButton } from '../component/AppButtons';
import ErrorMessage from '../component/ErrorMessage';
import {
  postNews,
  useComment,
  useLike,
  userFavorite,
} from '../services/NewsService';
import { Context } from '../contexts/Context';
import CommentList from '../component/CommentList';
import { baseUrl } from '../utils/variables';
import DialogInput from 'react-native-dialog-input';

// utils Imports
import { formatToDate, formatToDistance } from '../utils/timestamp';

// UI Imports
import colors from '../utils/colors';
import fontSize from '../utils/fontSize';
import McIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PreviewScreen = ({ route, navigation }) => {
  const {
    dialogInputVisible,
    setDialogInputVisible,
    editCommentInput,
    setEditCommentInput,
  } = useContext(Context);
  const { token } = useContext(Context);
  const { news } = route.params;
  const scrollViewRef = useRef();

  const saveAsDraft = async () => {
    try {
      const response = await postNews(route.params.formData, token);
      console.log('status', response.status);
      if (response.status == 200) {
        Alert.alert('News saved to Draft');
      }
    } catch (error) {
      console.log('Post news', error.message);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      nestedScrollEnabled={true}
      ref={scrollViewRef}
    >
      <View style={styles.container}>
        <DialogInput
          isDialogVisible={dialogInputVisible}
          title={'Modify your comment'}
          initValueTextInput={editCommentInput}
          textInputProps={{ autoCorrect: false, autoCapitalize: false }}
          submitInput={(inputText) => {
            setEditCommentInput(inputText), setDialogInputVisible(false);
            // backend put comment
          }}
          closeDialog={() => setDialogInputVisible(false)}
        ></DialogInput>

        <Image style={styles.image} source={{ uri: news.image }} />
        {/* <Image style={styles.image} source={require('../assets/images/blank_image.jpg')} /> */}

        <View style={styles.detailContainer}>
          <Text style={styles.title}>{news.title}</Text>

          <View style={styles.dateContainer}>
            <McIcons
              name="calendar-clock"
              size={18}
              color={colors.medium_grey}
            />
            <Text style={styles.date}>{formatToDate(new Date())}</Text>
          </View>

          <View style={styles.dateDistanceContainer}>
            <McIcons name="update" size={18} color={colors.medium_grey} />
            <Text style={styles.dateDistance}>
              {formatToDistance(new Date())}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.bookmarkContainer}>
              <McIcons
                name="bookmark-outline"
                size={28}
                color={colors.nokia_blue}
              />
            </View>

            <View style={styles.likesContainer}>
              <McIcons
                name="thumb-up-outline"
                size={20}
                color={colors.nokia_blue}
              />
              <Text style={[styles.likeNumbers, { color: colors.nokia_blue }]}>
                0
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.opContainer}>
          <Text style={styles.op}>{news.op}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.content}>{news.content}</Text>
        </View>

        <View
          style={{
            borderBottomColor: colors.light_grey,
            borderBottomWidth: 1,
            width: '100%',
            alignSelf: 'center',
            marginTop: 20,
          }}
        />

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.exitButtonContainer}
            onPress={() => {
              navigation.navigate('Publish');
            }}
          >
            <Text style={styles.exit}>Exit preview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.draftButtonContainer}
            onPress={saveAsDraft}
          >
            <Text style={styles.draft}>Save as draft</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_background,
    paddingHorizontal: '5%',
    minHeight: '100%',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
  },
  detailContainer: {
    marginVertical: 10,
  },
  title: {
    fontFamily: 'IBM',
    fontSize: fontSize.subtitle,
    fontWeight: 'bold',
    color: colors.dark_text,
  },
  dateContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: 2,
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.medium_grey,
  },
  dateDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateDistance: {
    marginLeft: 2,
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.medium_grey,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 2,
    right: 2,
    alignItems: 'center',
  },
  bookmarkContainer: {
    height: 30,
    alignItems: 'center',
    marginRight: 15,
  },
  likesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeNumbers: {
    fontFamily: 'IBM',
    fontSize: fontSize.caption,
    color: colors.dark_text,
  },
  opContainer: {
    marginTop: 0,
  },
  op: {
    fontFamily: 'IBM',
    fontSize: fontSize.large,
    color: colors.dark_text,
    autoCapitalize: true,
  },
  contentContainer: {
    marginTop: 15,
  },
  content: {
    fontFamily: 'IBM',
    fontSize: fontSize.medium,
    color: colors.dark_text,
  },
  bottomButtonContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  exitButtonContainer: {
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  exit: {
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.light_text,
  },
  draftButtonContainer: {
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.positive,
  },
  draft: {
    fontFamily: 'IBM',
    fontSize: fontSize.small,
    color: colors.light_text,
  },
});
export default PreviewScreen;
