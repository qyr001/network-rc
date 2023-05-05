const { configDir } = require("../unit");
const { join } = require("path");
const { existsSync, mkdirSync, statSync } = require("fs");
const audioPlayer = require("../audioPlayer");
const status = require("../status");
const {
  SpeechSynthesizer,
  SpeechConfig,
  AudioConfig,
  SpeechSynthesisOutputFormat,
} = require("microsoft-cognitiveservices-speech-sdk");

const key = "9c85d4afefec49a592a08078390c2c0b";
const speechConfig = SpeechConfig.fromSubscription(key, "southeastasia");
speechConfig.speechSynthesisOutputFormat =
  SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;
speechConfig.speechSynthesisLanguage = "zh-CN";

const tts = (text, filePath) => {
  try {
    const audioConfig = AudioConfig.fromAudioFileOutput(filePath);
    const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

    return new Promise((resolve, reject) => {
      logger.info(`TTS SDK: ${text} ==> "${filePath}"`);
      synthesizer.speakTextAsync(
        text,
        (result) => {
          const { audioData, errorDetails } = result;
          if (!audioData) {
            reject(errorDetails);
            return;
          }
          logger.info("TTS SDK Success: " + text);
          synthesizer.close();
          resolve();
          return result;
        },
        (error) => {
          logger.error(`TTS Error: ${error}`);
          synthesizer.close();
          reject(error);
        }
      );
    });
  } catch (e) {
    logger.error(`TTS SDK: ${e.message}`);
  }
};

if (!existsSync(`${configDir}/tts`)) {
  mkdirSync(`${configDir}/tts`);
}

const speak = async (text = "一起玩网络遥控车", options = {}) => {
  logger.info("TTS play: " + text);

  if (status.argv && !status.argv.tts) {
    logger.info("未开启 TTS");
    return;
  }

  const { time = 1, reg = "0", stop = false } = options;

  const filePath = join(`${configDir}/tts/`, text) + ".mp3";
  try {
    if (!existsSync(filePath) || statSync(filePath).size === 0) {
      try {
        await tts(text, filePath);
      } catch (e) {
        throw "TTS Error:" + e;
      }
    }
    await audioPlayer.playFile(filePath, { stop });
  } catch (e) {
    logger.error("播放声音错误:" + e);
  }
};

speak.tts = tts;
module.exports = speak;
