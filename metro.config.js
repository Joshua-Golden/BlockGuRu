// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname)

config.resolver.assetExts.push(
    'js', 'jsx', 'json', 'ts', 'tsx', 'cjs'
)

config.resolver.sourceExts.push(
    'glb', 'gltf', 'mtl', 'obj', 'png', 'jpg', 'fbx', 'ttf', 'cjs'
)

module.exports = config;
