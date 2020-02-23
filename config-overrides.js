/* 
 * @file config-overrides.js
 * @author Leo Jie()
 * 基于customzie和react-app-rewired的定制化配置文件
*/

// 从customize引入一些相关的方法
const { override,fixBabelImports,addLessLoader,addDecoratorsLegacy }=require('customize-cra')

const myLessVars= require('./lessVars')

module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled:true,
        myLessVars
    })
);