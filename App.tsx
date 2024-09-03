import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {AgoraUIKitProps} from 'agora-rn-uikit';
import {MaxVideoView, RtcConfigure} from 'agora-rn-uikit/Components';
import GridVideo from 'agora-rn-uikit/src/Views/GridVideo';
import LocalControls from 'agora-rn-uikit/src/Controls/LocalControls';
import {MaxUidConsumer} from 'agora-rn-uikit/src/Contexts/MaxUidContext';
import LocalUserContext from 'agora-rn-uikit/src/Contexts/LocalUserContext';
import {
  PropsInterface,
  PropsProvider,
} from 'agora-rn-uikit/src/Contexts/PropsContext';

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const props: AgoraUIKitProps = {
    connectionData: {
      appId: 'Your_App_ID',
      channel: 'Your_Channel_Name',
    },
  };

  const {rtcUid, rtcToken, ...restConnectonData} = props.connectionData;
  const adaptedProps: PropsInterface = {
    rtcProps: {
      uid: rtcUid,
      token: rtcToken,
      ...restConnectonData,
      ...props.settings,
      callActive: true,
      disableRtm: true,
    },
  };
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/50'}} // Replace with actual image URI
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.name}>Charleston Medico</Text>
            <Text style={styles.specialization}>Clínico Geral</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Section */}
      <View style={styles.chatContainer}>
        <View style={styles.message}>
          <Text style={styles.senderName}>Charleston Medico</Text>
          <Text style={styles.timestamp}>12:22</Text>
          <Text style={styles.messageText}>Hello</Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.senderName}>Charleston Medico</Text>
          <Text style={styles.timestamp}>12:23</Text>
          <Text style={styles.messageText}>Can you send your exam? pls</Text>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mensagem"
          placeholderTextColor="#888"
          value="" // This would be tied to a state in a real app
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>

      {/* Agora UI Kit Elements */}
      <View style={isFullScreen ? styles.fullScreenVideo : styles.video}>
        <PropsProvider value={adaptedProps}>
          <View style={[props.styleProps?.UIKitContainer]}>
            <RtcConfigure>
              {!isFullScreen && (
                <MaxUidConsumer>
                  {maxUsers =>
                    maxUsers[0] ? (
                      <MaxVideoView user={maxUsers[0]} key={maxUsers[0].uid} />
                    ) : null
                  }
                </MaxUidConsumer>
              )}
              {isFullScreen && (
                <LocalUserContext>
                  <GridVideo />
                  <LocalControls />
                </LocalUserContext>
              )}
            </RtcConfigure>
          </View>
        </PropsProvider>

        <TouchableOpacity
          style={!isFullScreen ? styles.expandButton : styles.minimizeButton}
          onPress={toggleFullScreen}>
          <Text style={styles.buttonText}>{isFullScreen ? '↙' : '↗'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 60,
    backgroundColor: '#007AFF',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileText: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  specialization: {
    fontSize: 14,
    color: '#fff',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  message: {
    marginBottom: 15,

    padding: 10,
    backgroundColor: '#E1F5FE',
    borderRadius: 5,
    maxWidth: '80%',
  },
  senderName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  video: {
    height: '30%',
    width: '35%',
    position: 'absolute',
    top: 150,
    right: 30,
    zIndex: 10,
    backgroundColor: '#000',
  },
  fullScreenVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: '#000',
  },
  expandButton: {
    position: 'absolute',
    top: 10,
    right: 5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    zIndex: 11, // Ensure it's above the video
  },
  minimizeButton: {
    position: 'absolute',
    top: 90,
    right: 10,
    height: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 60,
    borderRadius: 30,
    zIndex: 11, // Ensure it's above the video
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
