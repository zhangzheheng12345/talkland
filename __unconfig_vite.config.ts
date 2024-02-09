
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
/// <reference types="vitest"/>

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const Unocss = __unconfig_stub;
import { presetUno } from 'unocss'
import { presetIcons } from 'unocss'

import path from 'path'

const __unconfig_default =  defineConfig({
  plugins: [
    vue(),
    Unocss({
      theme: {
        colors: {
          deepGray: 'var(--deep-gray)',
          midGray: 'var(--mid-gray)',
          lightGray: 'var(--light-gray)',
          myBlue: 'var(--my-blue)',
          myRed: 'var(--my-red)'
        }
      },
      presets: [
        presetUno({
          dark: 'class'
        }),
        presetIcons({
          scale: 1.4,
          cdn: 'https://esm.sh'
        })
      ]
    })
  ],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    testTimeout: 2500
  }
})

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;