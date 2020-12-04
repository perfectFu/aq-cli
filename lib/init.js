// 打印欢迎页面
const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const { clone } = require('./download.js')
const open = require('open')

// promisify spawn
// 对接输入流
const spawn = async (...args) => {
	const { spawn } = require('child_process')
	return new Promise(resolve => {
		const proc = spawn(...args)
		proc.stdout.pipe(process.stdout)
		proc.stdin.pipe(process.stdin)
		proc.on('close', () => {
			resolve()
		})
	})
}

module.exports = async name => {
	// 打印欢迎页面
	clear()
	const data = await figlet('AQ-CLI Welcome!')
	log(data)
	log('🚀创建项目：' + name)
	await clone('github:su37josephxia/vue-template', name)
	log('安装依赖')
	await spawn('cnpm', ['install'], { cwd: `./${name}` })
	log(
		chalk.green(`
    👌安装完成： 
    To get Start: 
    =========================== 
    cd ${name} 
    npm run serve 
    ===========================
    `)
	)
	// 打开浏览器
	await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
	open('http://localhost:8080')
}
