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
import {
  postNews,
  useComment,
  useLike,
  useNews,
  userFavorite,
} from '../services/NewsService';
import { Context } from '../contexts/Context';
import { baseUrl } from '../utils/variables';
import DialogInput from 'react-native-dialog-input';
import ParagraphList from '../component/lists/ParagraphList';

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
  const { token, draft, setDraft } = useContext(Context);
  const { news, paragraph } = route.params;
  const scrollViewRef = useRef();
  const { postParagraphToNews } = useNews();
  const saveAsDraft = async () => {
    try {
      const response = await postNews(route.params.formData, token);
      if (response.status == 200) {
        for (let item of route.params.extraInputs) {
          const paragraph = new FormData();

          if (
            item.image.includes('file') ||
            (item.image.includes('http') &&
              !item.image.includes('true&hot=false'))
          ) {
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
        }
        Alert.alert('News saved to Draft');
      }
    } catch (error) {
      console.log('Post news', error.message);
    }
  };

  const navigateToPublishScreen = () => {
    navigation.navigate('Publish', {
      news: news,
      paragraph: paragraph,
      preview: true,
      fromDraft: news.photoName.includes('http') ? true : false,
    });
    setDraft(draft + 1);
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
          }}
          closeDialog={() => setDialogInputVisible(false)}
        ></DialogInput>

        <Image style={styles.image} source={{ uri: news.photoName }} />

        <View style={styles.detailContainer}>
          <Text style={styles.title}>{news.news_title}</Text>

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
          <Text style={styles.op}>{news.news_op}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.content}>{news.news_content}</Text>
        </View>

        <View>
          {paragraph.map((item, index) => (
            <View key={index}>
              <ParagraphList paragraph={item} preview={true} />
            </View>
          ))}
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
            style={styles.singleButtonContainer}
            onPress={navigateToPublishScreen}
          >
            <View
              style={[
                styles.buttonTextContainer,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.preview}>Exit preview</Text>
            </View>
            <View style={styles.buttonIconBackground} />
            <View style={styles.buttonIconContainer}>
              <McIcons name="exit-to-app" size={24} color={colors.primary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.singleButtonContainer}
            onPress={saveAsDraft}
          >
            <View
              style={[
                styles.buttonTextContainer,
                { backgroundColor: colors.positive },
              ]}
            >
              <Text style={styles.draft}>Save as draft</Text>
            </View>
            <View style={styles.buttonIconBackground} />
            <View style={styles.buttonIconContainer}>
              <McIcons
                name="file-send-outline"
                size={24}
                color={colors.positive}
              />
            </View>
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
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  singleButtonContainer: {
    flex: 1,
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    marginHorizontal: 10,
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
    borderRightWidth: 25,
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
  preview: {
    marginLeft: '2%',
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.light_background,
  },
  draft: {
    textAlign: 'center',
    fontFamily: 'IBM',
    fontSize: fontSize.regular,
    color: colors.light_background,
  },
});
export default PreviewScreen;
