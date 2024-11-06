// uno.config.ts
import { defineConfig } from 'unocss'
import {
  presetWind,
  presetAttributify,
  presetIcons,
  presetTypography,
} from 'unocss'

export default defineConfig({
  // 使用 UnoCSS 预设
  presets: [
    presetWind(), // 预设的原子化 CSS 样式，类似于 Tailwind
    presetAttributify(), // 支持通过属性来应用样式（如 `text="red-500"`）
    presetIcons(), // 支持图标字体类
    presetTypography(), // 支持排版相关的样式
  ],
  // 定义快捷方式（自定义类）
  shortcuts: {
    btn: 'px-4 py-2 bg-blue-500 text-white rounded',
    card: 'p-4 bg-white shadow-md rounded-lg',
    'flex-center': 'flex items-center justify-center',
  },
  // 自定义规则
  rules: [
    // 自定义一个 `m-auto` 类，设置 `margin: auto`
    ['m-auto', { margin: 'auto' }],
    // 定义一个 `text-underline` 类来实现文本下划线
    ['text-underline', { textDecoration: 'underline' }],
  ],
  // 配置一些其他选项（根据需要调整）
  theme: {
    colors: {
      primary: '#ff5722',
      secondary: '#00bcd4',
    },
    spacing: {
      '1/2': '50%',
    },
  },
})
