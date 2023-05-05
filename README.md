树莓派网络遥控车软件 Network RC

Network RC 是运行在树莓派和浏览器上的网络遥控车软件。具备以下特性：

低延迟控制和网络图传
通道自定义（27 个 高低电平或者 PWM 通道）
支持多摄像头，自适应传输分辨率
支持触屏操作、游戏手柄、枪控、板控
支持实时语音收听和语音喊话/语音对讲
内置服务器网络穿透/点对点连接 NAT 网络穿透自动切换
系统语音播报
播放音频
远程分享控制

依赖
ffmpeg: 运行前请确保树莓派上安装了 ffmpeg，
安装方法 sudo apt install ffmpeg -y nodejs

安装:
bash <(curl -sL https://jsd.cdn.zzko.cn/gh/qyr001/network-rc@master/install.sh)

