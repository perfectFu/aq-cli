#! /usr/bin/env node
const program = require('commander')
const welcome = require('../lib/init.js')

console.log('cli....')

// 定义命令 init <name>
program.command('init <name>').description('init project').action(welcome)

// 刷新路由
program
	.command('refresh')
	.description('refresh routers...')
	.action(require('../lib/refresh.js'))

program.parse(process.argv)
