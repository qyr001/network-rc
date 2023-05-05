const { localSave, localGet } = require("./unit");
const EventEmitter = require("events");
const homedir = require("os").homedir();
const configPath = `${homedir}/.network-rc/config.json`;
const path = require("path");

const defaultChannelList = [
  {
    enabled: true,
    name: "PWMA",
    id: "PWMA",
    pin: 13,
    type: "pwm",
    ui: [
    	{ id: "前后", positive: true, method: "default"},
    	{ id: "左右", positive: true, method: "default"},
    ],
    keyboard: [
      { name: "w", speed: 1, method: "default", autoReset: true },
      { name: "s", speed: 1, method: "default", autoReset: true },
      { name: "ArrowUp", speed: 0.5, method: "default", autoReset: true },
      { name: "ArrowDown", speed: 0.5, method: "default", autoReset: true },
    ],
    gamepad: [
      { name: "button-4", speed: 0.5, method: "default", autoReset: true },
      { name: `button-6`, speed: 1, method: "default", autoReset: true },
      { name: `button-5`, speed: 0.5, method: "default", autoReset: true },
      { name: "button-7", speed: 1, method: "default", autoReset: true },
    ],
    valuePostive: 1.0,
    valueNegative: -0.1,
    valueReset: 0,
  },
  {
    enabled: true,
    name: "PWMB",
    id: "PWMB",
    pin: 20,
    type: "pwm",
    ui: [
    	{ id: "前后", positive: true, method: "default"},
    	{ id: "左右", positive: true, method: "default",},
    ],
    keyboard: [
      { name: "w", speed: 1, method: "default", autoReset: true },
      { name: "s", speed: 1, method: "default", autoReset: true },
      { name: "ArrowUp", speed: 0.5, method: "default", autoReset: true },
      { name: "ArrowDown", speed: 0.5, method: "default", autoReset: true },
    ],
    gamepad: [
      { name: "button-4", speed: 0.5, method: "default", autoReset: true },
      { name: `button-6`, speed: 1, method: "default", autoReset: true },
      { name: `button-5`, speed: 0.5, method: "default", autoReset: true },
      { name: "button-7", speed: 1, method: "default", autoReset: true },
    ],
    valuePostive: 1.0,
    valueNegative: -0.1,
    valueReset: 0,
  },
  {
    enabled: true,
    name: "AIN1",
    id: "AIN1",
    pin: 19,
    type: "switch",
    ui: [
    	{ id: "前后", positive: true, method: "default"},
    	{ id: "左右", positive: true, method: "default"}
    ],
    keyboard: [
      { name: "w", speed: 0.5, method: "default", autoReset: true },
      { name: "d", speed: 0.5, method: "default", autoReset: true },
    ],
    gamepad: [
      { name: "button-10", speed: 0.5, method: "default", autoReset: true },
      { name: "button-11", speed: 0.5, method: "default", autoReset: true },
    ],
  },
  {
    enabled: true,
    name: "AIN2",
    id: "AIN2",
    pin: 16,
    type: "switch",
    ui: [
    	{ id: "前后", positive: false, method: "default"},
    	{ id: "左右", positive: false, method: "default"}
    ],
    keyboard: [
      { name: "s", speed: 0.5, method: "default", autoReset: true },
      { name: "a", speed: 0.5, method: "default", autoReset: true },
    ],
    gamepad: [
      { name: "button-12", speed: 0.5, method: "default", autoReset: true },
      { name: "button-13", speed: 0.5, method: "default", autoReset: true },
    ],
  },
  {
    enabled: true,
    name: "BIN1",
    id: "BIN1",
    pin: 21,
    type: "switch",
    ui: [
    	{ id: "前后", positive: true, method: "default"},
    	{ id: "左右", positive: false, method: "default"}
    	],
    keyboard: [
      { name: "w", speed: 0.5, method: "default", autoReset: true },
      { name: "a", speed: 0.5, method: "default", autoReset: true },
    ],
    gamepad: [
      { name: "button-10", speed: 0.5, method: "default", autoReset: true },
      { name: "button-13", speed: 0.5, method: "default", autoReset: true },
    ],
  },
  {
    enabled: true,
    name: "BIN2",
    id: "BIN2",
    pin: 26,
    type: "switch",
    ui: [
    	{ id: "前后", positive: false, method: "default"},
    	{ id: "左右", positive: true, method: "default"}
    	],
    keyboard: [
      { name: "s", speed: 0.5, method: "default", autoReset: true },
      { name: "d", speed: 0.5, method: "default", autoReset: true },
    ],
    gamepad: [
      { name: "button-12", speed: 0.5, method: "default", autoReset: true },
      { name: "button-11", speed: 0.5, method: "default", autoReset: true },
    ],
  },
  {
    enabled: true,
    name: "云台x",
    id: "云台x",
    pin: 6,
    type: "pwm",
    ui: [{ id: "云台", positive: true, axis: "x", method: "step", speed: 0.02 }],
    keyboard: [
      { name: "j", speed: 0.02, method: "step" },
      { name: "l", speed: -0.02, method: "step" },
      { name: "p", speed: 0.9, method: "default" },
    ],
    gamepad: [
    	{ name: "axis-6", method: "step", speed: -0.02 },
    	{ name: "axis-4", method: "step", speed: 0.02 },
    	{ name: "button-9", speed: 0.5, method: "step", autoReset: true },
    	],
    valuePostive: 1.7,
    valueNegative: 0.02,
    valueReset: 0.9,
    orientation: {
      axis: "x",
    },
  },
  {
    enabled: true,
    name: "云台y",
    id: "云台y",
    pin: 5,
    type: "pwm",
    ui: [{ id: "云台", positive: false, axis: "y", method: "step", speed: 0.02 }],
    keyboard: [
      { name: "i", method: "step", speed: 0.02 },
      { name: "k", method: "step", speed: -0.02 },
      { name: "p", speed: 0.9, method: "default" },
    ],
    gamepad: [
    	{ name: "axis-7", method: "step", speed: 0.02 },
    	{ name: "axis-5", method: "step", speed: -0.02 },
    	{ name: "button-9", speed: 0.9, method: "default", autoReset: true },
    	],
    valuePostive: 1.7,
    valueNegative: 0.02,
    valueReset: 0.9,
    orientation: {
      axis: "y",
    },
  },
  {
    enabled: true,
    name: "车灯",
    id: "车灯",
    pin: 10,
    type: "switch",
    ui: [{ id: "车灯", positive: true }],
    keyboard: [{ name: "e", speed: 1, autoReset: false }],
    gamepad: [{ name: "button-8", speed: 1, method: "default", autoReset: true },],
  },
];

const defaultSpecialChannel = {
  speed: "PWMA",
  direction: "PWMB",
};

const defaultUIComponentList = [
  {
    enabled: true,
    name: "前后",
    id: "前后",
    type: "slider",
    vertical: true,
    autoReset: true,
    defaultPosition: {
      portrait: {
        x: 22.037353515625,
        y: 470.1780700683594,
        z: 3,
        size: {
          width: 65,
          height: 200,
        },
      },
      landscape: {
        x: 81.03462219238281,
        y: 114.36590576171875,
        z: 3,
        size: {
          width: 53,
          height: 164,
        },
      },
    },
  },
  {
    enabled: true,
    name: "左右",
    id: "左右",
    type: "slider",
    vertical: false,
    autoReset: true,
    defaultPosition: {
      portrait: {
        x: 142.10659790039062,
        y: 537.4343109130859,
        z: 4,
        size: {
          width: 228,
          height: 72,
        },
      },
      landscape: {
        x: 546.9650573730469,
        y: 140.82928466796875,
        z: 4,
        size: {
          width: 187,
          height: 60,
        },
      },
    },
  },
  {
    enabled: true,
    name: "云台",
    id: "云台",
    type: "joystick",
    autoReset: false,
    defaultPosition: {
      portrait: {
        x: 103.10848999023438,
        y: 345.5633544921875,
        z: 5,
        size: {
          width: 145,
          height: 145,
        },
      },
      landscape: {
        x: 586.1330108642578,
        y: 231.12619018554688,
        z: 5,
        size: {
          width: 102,
          height: 102,
        },
      },
    },
  },
];

const defaultConfig = {
  /** 自动刹车的延迟时间 */
  autoLockTime: 400,

  /** 自动刹车的反响制动的时长 */
  brakeTime: 100,

  /** 摄像头采集分辨率最大宽度 */
  cameraMaxWidth: 640,

  /** 电调最大功率百分比 */
  maxSpeed: 100,

  /** 舵机修正 */
  directionFix: 0,

  /** 舵机反向 */
  directionReverse: false,

  /** 油门反向 */
  speedReverse: false,

  enabledHttps: false,

  /** 手柄左摇杆是否控制油门 */
  enabledAxis1Controal: false,

  /** 分享控制码 */
  sharedCode: undefined,

  /** 分享时间 */
  sharedDuration: 10 * 60 * 1000,

  channelList: defaultChannelList,

  specialChannel: defaultSpecialChannel,

  uiComponentList: defaultUIComponentList,

  audioList: [
    {
      path: path.resolve(__dirname, "../assets/audio1.mp3"),
      keyboard: "1",
      gamepadButton: 12,
      name: "滴",
      showFooter: true,
      type: "audio",
    },
    {
      path: path.resolve(__dirname, "../assets/audio2.mp3"),
      keyboard: "2",
      gamepadButton: 14,
      name: "喔哦喔",
      showFooter: false,
      type: "audio",
    },
    {
      keyboard: "3",
      gamepadButton: 15,
      name: "救救我啊，救救我",
      showFooter: false,
      type: "text",
    },
    {
      keyboard: "4",
      name: "停止",
      showFooter: false,
      type: "stop",
      gamepadButton: 13,
    },
  ],
};

class Status extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;

    this.currentSpeedRateValue = 0;

    this.password = undefined;

    try {
      this.config = {
        ...defaultConfig,
        ...localGet(configPath),
      };
    } catch (e) {
      logger.error(e);
      this.config = defaultConfig;
    }
  }

  resetChannelAndUI() {
    this.saveConfig({
      channelList: defaultChannelList,
      specialChannel: defaultSpecialChannel,
      uiComponentList: defaultUIComponentList,
    });
  }

  saveConfig(obj) {
    Object.keys(obj).map((key) => {
      this.config[key] = obj[key];
    });
    localSave(configPath, this.config);
    this.emit("update");
  }

  resetConfig() {
    this.config = defaultConfig;
    localSave(configPath, this.config);
    this.emit("update");
  }
}

module.exports = new Status();
