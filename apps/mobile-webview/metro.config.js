/*eslint-env node*/
const { getDefaultConfig } = require('expo/metro-config')
const exclusionList = require('metro-config/src/defaults/exclusionList')
const path = require('path')

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, '../..')
const projectRoot = __dirname

const config = getDefaultConfig(projectRoot)
const { resolver } = config

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]

// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPath = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
]

config.resolver.disableHierarchicalLookup = true

config.resolver = {
    ...resolver,
    sourceExts: [...resolver.sourceExts, 'cjs', 'mjs'],
    blacklistRE: exclusionList([/.vercel\/.*/]),
}

module.exports = config
