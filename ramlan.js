const {
	WAConnection,
	MessageType,
	Presence,
	Mimetype,
	GroupSettingChange,
	WA_MESSAGE_STUB_TYPES,
	mentionedJid
} = require("@adiwajshing/baileys")
const imageToBase64 = require('image-to-base64')
const moment = require("moment-timezone")
const speed = require('performance-now')
const base64Img = require('base64-img')
const imgbb = require('imgbb-uploader')
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { exec } = require("child_process")
const fetch = require('node-fetch')
const ms = require('parse-ms')
const crypto = require('crypto')
const axios = require('axios')
const cheerio = require('cheerio')
const FormData = require('form-data')
const toMs = require('ms')
const fs = require("fs")
const PhoneNumber = require('awesome-phonenumber')
const googleImage = require('g-i-s')
const yts = require('yt-search')
const { 
  y2mateA,
  y2mateV
} = require('./lib/ytdl.js')
const {
  fbDown 
} = require('./lib/fbdl.js')
const { fromBuffer } = require('file-type')
const { fetchJson } = require('./lib/fetcher')
const { nad } = require('./language')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const a = '```'

const {
	color,
	bgcolor
} = require('./lib/color')
const {
	getBuffer,
	getGroupAdmins,
	getRandom,
	banner,
	start,
	info,
	success,
	close
} = require('./lib/functions')
const { isTicTacToe, getPosTic, KeisiSemua, cekIsi, cekTicTac } = require('./lib/tictactoe')
const tictac = require('./lib/tictac')
const { addCommands, checkCommands, deleteCommands } = require('./lib/commands')

// DATA GAME
let tictactoe = []
//Load Json
const mengsetting = JSON.parse(fs.readFileSync('./settings/Ramlan.json'))
const {
	botName,
	ownerName,
	ownerNumbers,
	ZeksApi,
	botPrefix,
	GrupLimitz,
	autor,
	peknem,
	CeerTod
} = mengsetting
prefix = botPrefix
blocked = []
memberlimit = GrupLimitz
cr = CeerTod
const ownerNumber = `${ownerNumbers}@s.whatsapp.net`
const vcard = 'BEGIN:VCARD\n'
	+ 'VERSION:3.0\n'
	+ `FN:${ownerName}\n`
	+ `ORG:${botName};\n`
	+ `TEL;type=CELL;type=VOICE;waid=${ownerNumbers}:${PhoneNumber('+' + ownerNumbers).getNumber('international')}\n`
	+ 'END:VCARD'
// APIKEY
const keybb = '6d3163b18cbf1d519aa8abfb0c58f31f'
const zeksapi = 'genbotkey'
const lolhuman = 'genbotkey'
const killerkey = 'mariogans'
// APIKEY
const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
const premium = JSON.parse(fs.readFileSync('./database/premium.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
const bad = JSON.parse(fs.readFileSync('./database/bad.json'))
const badword = JSON.parse(fs.readFileSync('./database/badword.json'))
const event = JSON.parse(fs.readFileSync('./database/event.json'))
const ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const _level = JSON.parse(fs.readFileSync('./database/level.json'))
const _afk = JSON.parse(fs.readFileSync('./database/afk.json'))
const audioya = JSON.parse(fs.readFileSync('./media/audio.json'))
const imegya = JSON.parse(fs.readFileSync('./media/image.json'))
const setimker = JSON.parse(fs.readFileSync('./media/stik.json'))
const vidioya = JSON.parse(fs.readFileSync('./media/video.json'))
const tebakgambar = JSON.parse(fs.readFileSync('./database/tebakgambar.json'))
const caklontong = JSON.parse(fs.readFileSync('./database/caklontong.json'))
const family = JSON.parse(fs.readFileSync('./database/family100.json'))
const tebakanime = JSON.parse(fs.readFileSync('./database/tebakanime.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'))
const commandsDB = JSON.parse(fs.readFileSync('./database/commands.json'))

// End Json
const getLevelingXp = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].xp
	}
}

const getLevelingLevel = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].level
	}
}

const getLevelingId = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].id
	}
}

const addLevelingXp = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].xp += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingLevel = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].level += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingId = (sender) => {
	const obj = { id: sender, xp: 1, level: 1 }
	_level.push(obj)
	fs.writeFileSync('./database/level.json', JSON.stringify(_level))
}

const getRegisteredRandomId = () => {
	return _registered[Math.floor(Math.random() * _registered.length)].id
}

const addRegisteredUser = (userid, sender, time, serials) => {
	const obj = { id: userid, name: sender, time: time, serial: serials }
	_registered.push(obj)
	fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
}

const createSerial = (size) => {
	return crypto.randomBytes(size).toString('hex').slice(0, size)
}

const checkRegisteredUser = (sender) => {
	let status = false
	Object.keys(_registered).forEach((i) => {
		if (_registered[i].id === sender) {
			status = true
		}
	})
	return status
}
// AFK BOCHI BOT
/**
 * Add AFK.
 * @param {String} userId 
 * @param {String} time 
 * @param {String} reason 
 * @param {Object} _dir 
 */
const addAfkUser = (userId, time, reason, _dir) => {
	const obj = { id: userId, time: time, reason: reason }
	_dir.push(obj)
	fs.writeFileSync('./database/afk.json', JSON.stringify(_dir))
}

/**
 * Check user AFK.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Boolean}
 */
const checkAfkUser = (userId, _dir) => {
	let status = false
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			status = true
		}
	})
	return status
}

/**
 * Get AFK reason.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {String}
 */
const getAfkReason = (userId, _dir) => {
	let position = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			position = i
		}
	})
	if (position !== null) {
		return _dir[position].reason
	}
}
/**
 * Get AFK time.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {String}
 */
const getAfkTime = (userId, _dir) => {
	let position = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			position = i
		}
	})
	if (position !== null) {
		return _dir[position].time
	}
}

/**
 * Get AFK ID.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {String}
 */
const getAfkId = (userId, _dir) => {
	let position = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			position = i
		}
	})
	if (position !== null) {
		return _dir[position].id
	}
}

/**
 * Get AFK position.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getAfkPosition = (userId, _dir) => {
	let position = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			position = i
		}
	})
	return position
}

function kyun(seconds) {
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor(seconds % (60 * 60) / 60);
	var seconds = Math.floor(seconds % 60);
	return `${pad(hours)} H ${pad(minutes)} M ${pad(seconds)} S`
}
// FUNCTION Metadata sticker
function addMetadata(packname, author) {
    if (!packname) packname = `${peknem}`; if (!author) author = ` ${autor}`;
    author = author.replace(/[^a-zA-Z0-9]/g, '');
    //let name = `data`

    if (fs.existsSync(`./sticker/data.exif`)) {
        return `./sticker/data.exif`
    }
    const json = {
        "sticker-pack-name": packname,
        "sticker-pack-publisher": author,
    }

    const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
    const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]

    let len = JSON.stringify(json).length
    let last

    if (len > 256) {
        len = len - 256
        bytes.unshift(0x01)
    } else {
        bytes.unshift(0x00)
    }

    if (len < 16) {
        last = len.toString(16)
        last = "0" + len
    } else {
        last = len.toString(16)
    }

    const buf2 = Buffer.from(last, "hex")
    const buf3 = Buffer.from(bytes)
    const buf4 = Buffer.from(JSON.stringify(json))

    const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])

    fs.writeFile(`./sticker/data.exif`, buffer, (err) => {
        return `./sticker/data.exif`
    }
    )
}
// MONOSPACE
function monospace(string) {
            return '```' + string + '```'
        }
// SLEEP 
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function starts() {
	const gen = new WAConnection()
	gen.version = [2, 2119, 6]
	gen.logger.level = 'warn'
	gen.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Scan BosQue'))
	})
	gen.on('credentials-updated', () => {
		fs.writeFileSync('./session-id.json', JSON.stringify(gen.base64EncodedAuthInfo(), null, '\t'))
		info('2', 'Login Ke Hati Dia')
	})
	fs.existsSync('./session-id.json') && gen.loadAuthInfo('./session-id.json')
	gen.on('connecting', () => {
		start('2', 'Sedang Masuk...')
	})
	gen.on('open', () => {
		success('2', 'Berhasil Masuk')
	})
	await gen.connect({ timeoutMs: 30 * 1000 })

	gen.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			mem = anu.participants[0]
            try {
                var pp_user = await gen.getProfilePicture(mem)
            } catch (e) {
                var pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add') {
           let mdata = await gen.groupMetadata(anu.jid)
            memeg = mdata.participants.length
        	num = anu.participants[0]
                anu_user = gen.contacts[mem]
                teks = `*Welcome* 👋\n*User:* @${num.split('@')[0]}\nKetik *#menu* untuk menu!`
	        let buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome?nama=${num.split('@')[0]}&descriminator=GEN BOT&memcount=WELCOME&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.ibb.co/mHtC5V5/75a0537f7e23.jpg`)
		gen.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
		}
            if (anu.action == 'remove') {
                let mdata = await gen.groupMetadata(anu.jid)
            	num = anu.participants[0]
                anu_user = gen.contacts[mem]
                memeg = mdata.participants.length
                out = `*GoodBay* 👋 \n*User:* @${num.split('@')[0]}`
                let buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye?nama=${num.split('@')[0]}&descriminator=GEN BOT&memcount=LEFT&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.ibb.co/mHtC5V5/75a0537f7e23.jpg`)
                gen.sendMessage(mdata.id, buff, MessageType.image, {caption: out, contextInfo: {"mentionedJid": [num]}})
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
// AUTO BLOCK
gen.on('CB:action,,call', async json => {
    const callerId = json[2][0][1].from;
    console.log("Telpon dari "+ callerId)
        gen.sendMessage(callerId, `Bot tidak menerima panggilan. Karena kamu telah melanggar rules, maka kamu telah diblok, Harap hubungi owner: wa.me/${ownerNumbers}`, MessageType.text)
        await sleep(4000)
        await gen.blockUser(callerId, "add") // Block user
})
	gen.on('message-update', async (geps) => {
		try {
			const from = geps.key.remoteJid
			const messageStubType = WA_MESSAGE_STUB_TYPES[geps.messageStubType] || 'MESSAGE'
			const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
			const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
			const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
			let sender = geps.key.fromMe ? gen.user.jid : geps.key.remoteJid.endsWith('@g.us') ? geps.participant : geps.key.remoteJid
			const isRevoke = geps.key.remoteJid.endsWith('@s.whatsapp.net') ? true : geps.key.remoteJid.endsWith('@g.us') ? dataRevoke.includes(from) : false
			const isCtRevoke = geps.key.remoteJid.endsWith('@g.us') ? true : dataCtRevoke.data ? true : false
			const isBanCtRevoke = geps.key.remoteJid.endsWith('@g.us') ? true : !dataBanCtRevoke.includes(sender) ? true : false
			const numbernye = ["0"]
			if (messageStubType == 'REVOKE') {
				console.log(`Status untuk grup : ${!isRevoke ? 'On' : 'Off'}\nStatus semua kontak : ${!isCtRevoke ? 'On' : 'Off'}\nStatus kontak dikecualikan : ${!isBanCtRevoke ? 'On' : 'Off'}`)
				if (!isRevoke) return
				if (!isCtRevoke) return
				if (!isBanCtRevoke) return
				const from = geps.key.remoteJid
				const isGroup = geps.key.remoteJid.endsWith('@g.us') ? true : false
				let int
				let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
				const id_deleted = geps.key.id
				const conts = geps.key.fromMe ? gen.user.jid : gen.contacts[sender] || { notify: jid.replace(/@.+/, '') }
				const pushname2 = geps.key.fromMe ? gen.user.name : conts.notify || conts.vname || conts.name || '-'
				const opt4tag = {
					contextInfo: { mentionedJid: [sender] }
				}
				for (let i = 0; i < infoMSG.length; i++) {
					if (infoMSG[i].key.id == id_deleted) {
						const dataInfo = infoMSG[i]
						const type = Object.keys(infoMSG[i].message)[0]
						const timestamp = infoMSG[i].messageTimestamp
						int = {
							no: i,
							type: type,
							timestamp: timestamp,
							data: dataInfo
						}
					}
				}
				const index = Number(int.no)
				const body = int.type == 'conversation' ? infoMSG[index].message.conversation : int.type == 'extendedTextMessage' ? infoMSG[index].message.extendedTextMessage.text : int.type == 'imageMessage' ? infoMSG[index].message.imageMessage.caption : int.type == 'stickerMessage' ? 'Sticker' : int.type == 'audioMessage' ? 'Audio' : int.type == 'videoMessage' ? infoMSG[index].videoMessage.caption : infoMSG[index]
				const mediaData = int.type === 'extendedTextMessage' ? JSON.parse(JSON.stringify(int.data).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : int.data
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${cr}`
				// var taged = Lan.message.extendedTextMessage.contextInfo.mentionedJid[0]
				var selepbot72 = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (int.type == 'conversation' || int.type == 'extendedTextMessage') {
					const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname2}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Text
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}
`
					gen.sendMessage(from, strConversation, MessageType.text, selepbot72)
				} else if (int.type == 'stickerMessage') {
					var itsme = `${numbernye}@s.whatsapp.net`
					var split = `${cr}`
					const pingbro23 = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
					const filenamesticker = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
					const savedFilenamesticker = await gen.downloadAndSaveMediaMessage(int.data, `./media/sticker/${filenamesticker}`);
					const strConversationsticker = `「 *ANTI-DELETE* 」

• Nama: ${pushname2}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Sticker
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
`

					const buff = fs.readFileSync(savedFilenamesticker)
					gen.sendMessage(from, strConversationsticker, MessageType.text, opt4tag)
					gen.sendMessage(from, buff, MessageType.sticker, pingbro23)
					fs.unlinkSync(savedFilenamesticker)

				} else if (int.type == 'imageMessage') {
					var itsme = `${numbernye}@s.whatsapp.net`
					var split = `${cr}`
					const pingbro22 = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
					const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
					const savedFilename = await gen.downloadAndSaveMediaMessage(int.data, `./media/image/${filename}`);
					const buff = fs.readFileSync(savedFilename)
					const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname2}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Image
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}
`
					gen.sendMessage(from, buff, MessageType.image, { contextInfo: { mentionedJid: [sender] }, caption: strConversation })
					fs.unlinkSync(savedFilename)
				}
			}
		} catch (e) {
			console.log('Message : %s', color(e, 'green'))
		}
	})

	gen.on('message-new', async (Lan) => {
		try {
			if (!Lan.message) return
			if (Lan.key && Lan.key.remoteJid == 'status@broadcast') return
			if (Lan.key.fromMe) return
			let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
			infoMSG.push(JSON.parse(JSON.stringify(Lan)))
			fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
			const urutan_pesan = infoMSG.length
			if (urutan_pesan === 5000) {
				infoMSG.splice(0, 4300)
				fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
			}
			global.prefix
			global.blocked
			const content = JSON.stringify(Lan.message)
			const from = Lan.key.remoteJid
			Lan.message = (Object.keys(Lan.message)[0] === 'ephemeralMessage') ? Lan.message.ephemeralMessage.message : Lan.message
			const type = Object.keys(Lan.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			body = (type === 'conversation' && Lan.message.conversation.startsWith(prefix)) ? Lan.message.conversation : (type == 'imageMessage') && Lan.message.imageMessage.caption.startsWith(prefix) ? Lan.message.imageMessage.caption : (type == 'videoMessage') && Lan.message.videoMessage.caption.startsWith(prefix) ? Lan.message.videoMessage.caption : (type == 'extendedTextMessage') && Lan.message.extendedTextMessage.text.startsWith(prefix) ? Lan.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? Lan.message.conversation : (type === 'extendedTextMessage') ? Lan.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && Lan.message.conversation) ? Lan.message.conversation : (type == 'imageMessage') && Lan.message.imageMessage.caption ? Lan.message.imageMessage.caption : (type == 'videoMessage') && Lan.message.videoMessage.caption ? Lan.message.videoMessage.caption : (type == 'extendedTextMessage') && Lan.message.extendedTextMessage.text ? Lan.message.extendedTextMessage.text : ''
			chats = (type === 'conversation' && Lan.message.conversation) ? Lan.message.conversation : (type == 'imageMessage') && Lan.message.imageMessage.caption ? Lan.message.imageMessage.caption : (type == 'documentMessage') && Lan.message.documentMessage.caption ? Lan.message.documentMessage.caption : (type == 'videoMessage') && Lan.message.videoMessage.caption ? Lan.message.videoMessage.caption : (type == 'extendedTextMessage') && Lan.message.extendedTextMessage.text ? Lan.message.extendedTextMessage.text : ""
			const mesejAnti = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = gen.user.jid
			const totalchat = await gen.chats.all()
			const sender = isGroup ? Lan.participant : Lan.key.remoteJid
			const pushname = gen.contacts[sender] != undefined ? gen.contacts[sender].vname || gen.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await gen.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isEventon = isGroup ? event.includes(from) : false
			const isRegistered = checkRegisteredUser(sender)
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isBanned = ban.includes(sender)
			const isPrem = premium.includes(sender) || isOwner
			const isAntiLink = isGroup ? antilink.includes(from) : false
            const isBadWord = isGroup ? badword.includes(from) : false
			const Rank = getLevelingLevel(sender)
			const isAfkOn = checkAfkUser(sender, _afk)
			const jumlahfitur = '231'
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
				return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				gen.sendMessage(from, teks, text, { quoted: Lan })
			}
			const sendMess = (hehe, teks) => {
				gen.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? gen.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : gen.sendMessage(from, teks.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": memberr } })
			}
			const sendImage = (teks) => {
				gen.sendMessage(from, teks, image, { quoted: Lan })
			}
			const costum = (pesan, tipe, target, target2) => {
				gen.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
			}
			const sendPtt = (teks) => {
				gen.sendMessage(from, audio, mp3, { quoted: Lan })
			}
const sendFileFromUrl = async(link, type, options) => {
  hasil = await getBuffer(link)
	gen.sendMessage(from, hasil, type, options).catch(e => {
	fetch(link).then((hasil) => {
	gen.sendMessage(from, hasil, type, options).catch(e => {
	gen.sendMessage(from, { url : link }, type, options).catch(e => {
	  reply('_Terjadi kesalahan!_')
	  console.log(e)
	})
	})
	})
	})
	}
        const fakestatus = (teks) => {
            gen.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": cr,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
        const fakeimage = (from, image, caption, cr) => {
                gen.sendMessage(from, image, MessageType.image,
                {
                quoted: {
                key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },
                message: { "imageMessage": {
                "mimetype": "image/jpeg", 
                "caption": cr, 
                "jpegThumbnail": fs.readFileSync(`./src/image/thumbnail.jpeg`)
                }
           }
     },
     caption: caption 
     })
}
			var prema = 'Free'
			if (isPrem) {
				prema = 'Premium'
			}
			if (isOwner) {
				prema = 'BOSS'
			}
			var role = 'NEWBIE'
			if (Rank <= 3) {
				role = 'Bronze I'
			} else if (Rank <= 5) {
				role = 'Bronze II'
			} else if (Rank <= 7) {
				role = 'Bronze III'
			} else if (Rank <= 9) {
				role = 'Silver I'
			} else if (Rank <= 11) {
				role = 'Silver II'
			} else if (Rank <= 13) {
				role = 'Silver III'
			} else if (Rank <= 16) {
				role = 'Gold I'
			} else if (Rank <= 18) {
				role = 'Gold II'
			} else if (Rank <= 20) {
				role = 'Gold III'
			} else if (Rank <= 22) {
				role = 'Gold IV'
			} else if (Rank <= 25) {
				role = 'Platinum I'
			} else if (Rank <= 27) {
				role = 'Platinum II'
			} else if (Rank <= 29) {
				role = 'Platinum III'
			} else if (Rank <= 31) {
				role = 'Platinum IV'
			} else if (Rank <= 33) {
				role = 'Diamond I'
			} else if (Rank <= 35) {
				role = 'Diamomd II'
			} else if (Rank <= 37) {
				role = 'Diamond III'
			} else if (Rank <= 39) {
				role = 'Diamond IV'
			} else if (Rank <= 45) {
				role = 'Master'
			} else if (Rank <= 100) {
				role = 'Grand Master'
			}

			if (isGroup && isRegistered && isLevelingOn) {
				const currentLevel = getLevelingLevel(sender)
				const checkId = getLevelingId(sender)
				try {
					if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
					const amountXp = Math.floor(Math.random() * 10) + 500
					const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
					const getLevel = getLevelingLevel(sender)
					addLevelingXp(sender, amountXp)
					if (requiredXp <= getLevelingXp(sender)) {
						addLevelingLevel(sender, 1)
						await reply(nad.levelup(pushname, sender, getLevelingXp, getLevel, getLevelingLevel, role))
					}
				} catch (err) {
					console.error(err)
				}
			}
			if (isGroup) {
				try {
					const getmemex = groupMembers.length
					if (getmemex <= memberlimit) {
						reply(`maaf kak membernya sedikit, aku gak bisa disini! Minimal member : ${memberlimit}`)
						setTimeout(() => {
							gen.groupLeave(from)
						}, 1000)
						setTimeout(() => {
							gen.updatePresence(from, Presence.composing)
							reply("Aku pamit ya kak:)")
						}, 0)
					}
				} catch (err) { console.error(err) }
			}
				
for (let kemem of bad) {

if (budy.includes(kemem)) {

				if (!isGroup) return
				if (!isBadWord) return
				if (isGroupAdmins) return reply('Untung Kau Admin:) Btw Jangan Ngegas Om😘')
				gen.updatePresence(from, Presence.composing)
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				reply(`Woyy ${sender.split("@")[0]} Jangan Ngomong Kasar Ngemtod😡`)
				setTimeout(() => {
					gen.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
				}, 1000)
				setTimeout(() => {
					gen.updatePresence(from, Presence.composing)
					reply("Maaf gue tendang!")
				}, 0)
			}
			}
			/*if (budy.includes("https://chat.whatsapp.com/")) {
				if (!isGroup) return
				if (!isAntiLink) return
				if (isGroupAdmins) return
				gen.updatePresence(from, Presence.composing)
				if (budy.includes("#izinbos")) return reply("Iya kak jangan spam ya")
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				reply(`Woyy ${sender.split("@")[0]} Gak Boleh Share Link`)
				setTimeout(() => {
					gen.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
				}, 1000)
				setTimeout(() => {
					gen.updatePresence(from, Presence.composing)
					reply("Maaf gue tendang!")
				}, 0)
			}*/
        // Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                gen.groupRemove(from, [sender])
            }
        }
			/*if (isGroup) {
			const mentiAfk = Lan.message[Object.keys(Lan.message)[0]].contextInfo ? Lan.message[Object.keys(Lan.message)[0]].contextInfo.mentionedJid : []
				for (let ment of mentiAfk) {
					if (checkAfkUser(ment, _afk)) {
						const getId = getAfkId(ment, _afk)
						const getReason = getAfkReason(getId, _afk)
						const getTime = getAfkTime(getId, _afk)
						gen.sendMessage(from, `「 *AFK MODE* 」
${a}Orang Nya Lagi AFK${a}
${a}Alasan : ${getReason}${a}
${a}Sejak : ${getTime}${a}
`, text, { quoted: Lan })
					}
				}
				if (checkAfkUser(sender, _afk) && !isCmd) {
					_afk.splice(getAfkPosition(sender, _afk), 1)
					fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
					gen.sendMessage(from, `${pushname} Telah Kembali Dari AFK\nPasti Gabut Yekan :v`, text, { quoted: Lan })
				}
			}*/
let OrgMention = []
        if (type === 'extendedTextMessage' && Lan.message.extendedTextMessage.contextInfo != null){
            OrgMention = Lan.message.extendedTextMessage.contextInfo.mentionedJid || []
        } else if (type === 'imageMessage' && Lan.message.imageMessage.contextInfo != null){
            OrgMention = Lan.message.imageMessage.contextInfo.mentionedJid || []
        } else if (type === 'videoMessage' && Lan.message.videoMessage.contextInfo != null){
            OrgMention = Lan.message.videoMessage.contextInfo.mentionedJid || []
        }
// AFK
        if (isGroup) {
            if (OrgMention.length != 0){
            for (let ment of OrgMention) {
                if (checkAfkUser(ment, _afk)) {
                    memberid = []
                    const getId = getAfkId(ment, _afk)
                    const getReason = getAfkReason(getId, _afk)
                    const getTime = getAfkTime(getId, _afk)
                    //const heheh = ms(getTime)
                    memberid.push(ment)
                    await mentions(`@${ment.split('@')[0]} sedang afk\n\n*Alasan :* ${getReason}\n*Sejak :* ${getTime}`, memberid, true)
                    sendMess(ment, `Ada yang mencari anda saat anda offline\n\nNama : ${pushname}\nNomor : wa.me/${sender.split("@")[0]}\nIn Group : ${groupName}\nPesan : ${budy}`)
                }
                if (ment === ownerNumber){
                    reply('Apa si tag tag owner ku')
                }
                if (ment === gen.user.jid){
                    reply(`Ya ada apa ${pushname}, silahkan kirim ${prefix}menu`)
                }
            }
        }
            if (checkAfkUser(sender, _afk)) {
                anu = []
                _afk.splice(getAfkPosition(sender, _afk), 1)
                fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                anu.push(sender)
                await mentions(`@${sender.split('@')[0]} telah kembali`, anu, true)
            }
        }
// TEBAK GAMBAR
if (tebakgambar.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = tebakgambar[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    reply("Selamat🥳 Jawaban kamu benar!")
                    delete tebakgambar[sender.split('@')[0]]
                    fs.writeFileSync("./database/tebakgambar.json", JSON.stringify(tebakgambar))
                } else {
                    reply("Jawaban Salah!")
                }
            }
// CAK LONTONG
if (caklontong.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = caklontong[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    reply("Selamat🥳 Jawaban kamu benar")
                    delete caklontong[sender.split('@')[0]]
                    fs.writeFileSync("./database/caklontong.json", JSON.stringify(caklontong))
                } else {
                    reply("Jawaban Salah!")
                }
            }
// FAMILY 100
if (family.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = family[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    reply("Selamat🥳 Jawaban kamu benar")
                    delete family[sender.split('@')[0]]
                    fs.writeFileSync("./database/family100.json", JSON.stringify(family))
                } else {
                    reply("Jawaban Salah!")
                }
            }
// TEBAK ANIME
if (tebakanime.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = tebakanime[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    reply("Selamat🥳 Jawaban kamu benar")
                    delete tebakanime[sender.split('@')[0]]
                    fs.writeFileSync("./database/tebakanime.json", JSON.stringify(tebakanime))
                } else {
                    reply("Jawaban Salah!")
                }
            }
// HOAX
const Hoax = async (p) => {
const lingk = await axios.get(`https://turnbackhoax.id/`)
const sop = cheerio.load(lingk.data)
const result = []
sop('div').find('header').each(function(c, d) {
const judul = sop(d).find('h3 > a').text().replace('\n', '').replace('\t\t\t\t\t', '').replace('\t\t\t\t', '') 
const link = sop(d).find('h3 > a').attr('href')
const author = sop(d).find('div > span').eq(1).text()
const waktu = sop(d).find('div > span').eq(0).text()
const komen = sop(d).find('div > span').eq(2).text()
const keterangan = sop('article > div > div > div').eq(0).text() 
const img = sop('article > figure > a > img').attr('src')
result.push({ judul, link, keterangan, img, waktu, author, komen })
})

return result
}
			colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
			if (!isGroup && isCmd) console.log('[\x1b[1;32mCMD\x1b[1;37m]', color(time, 'yellow'), color(command), 'dari', color(pushname), '/', color(sender.split('@')[0]))
			if (isGroup && isCmd) console.log('[\x1b[1;32mCMD\x1b[1;37m]', color(time, 'yellow'), color(command), 'dari', color(pushname), '/', color(sender.split('@')[0]), '\n', 'in', color(groupName, 'yellow'))
			if (isTicTacToe(from, tictactoe)) tictac(gen, Lan, tictactoe)
			
			// AUTO RESPON BY AQULZZ
			for (let i = 0; i < commandsDB.length ; i++) {
				if (chats.toLowerCase() == commandsDB[i].pesan) {
					reply(commandsDB[i].balasan)
				}
			}
			
			switch (command) {
				// AUTO RESPON BY AQULZZ
				case 'addfilter':{
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply(`Penggunaan ${prefix}addrespon key|respon\n\nContoh : ${prefix}addrespon fahri|gen`)
					let input1 = body.slice(11)
					if (!input1.includes('|')) return reply(`Penggunaan ${prefix}addrespon key|respon\n\nContoh : ${prefix}addrespon fahri|gen`)
					let input = input1.split("|")
					if (checkCommands(input[0], commandsDB) === true) return reply(`Command tersebut sudah ada`)
					addCommands(input[0], input[1], sender, commandsDB)	
					reply(`Key : ${input[0]}\nRespon : ${input[1]}\n\nRespon berhasil di set`)
				}
					break
				case 'delfilter':{
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply(`Penggunaan ${prefix}delrespon key\n\nContoh : ${prefix}delrespon ramlan`)
					if (!checkCommands(body.slice(11), commandsDB)) return reply(`Key tersebut tidak ada di database`)
					deleteCommands(body.slice(11), commandsDB)
					reply(`Berhasil menghapus respon dengan key ${body.slice(11)}`)
				}
					break
				case 'listfilter':{
					let txt = `List Respon\nTotal : ${commandsDB.length}\n\n`
					for (let i = 0; i < commandsDB.length; i++){
						txt += `❏ Key : ${commandsDB[i].pesan}\n`
					}
					reply(txt)
				}
					break
				case 'help':
				case 'menu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const reqXp = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
					const lvl = getLevelingLevel(sender)
					runtimebot = process.uptime()
					uptime = process.uptime()
				    myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
                    myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum at','Sabtu'];
              var tgl = new Date();
                    detik = tgl.getSeconds();
                    menit = tgl.getMinutes();
                    jam = tgl.getHours();
              var ampm = jam >= 12 ? 'PM' : 'AM';
              var day = tgl.getDate()
                   bulan = tgl.getMonth()
              var thisDay = tgl.getDay(),
                   thisDay = myDays[thisDay];
              var yy = tgl.getYear()
              var year = (yy < 1000) ? yy + 1900 : yy;
              const tanggal = `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
				    
                    anu = process.uptime()
					gmenu = fs.readFileSync(`./src/image/thumbnail.jpeg`)
					const menunya = `Hallo ${pushname} 👋
*User :* ${prema}   *Rank :* ${role}
_*==========================*_
_Tanggal : ${day} - ${myMonths[bulan]} - ${year}_
_Jam : ${jam}:${menit}:${detik}_

*<//GEN BOT//>*

_*« Sewa Bot »*_
_*❏${prefix}sewa*_
_*❏${prefix}addsewa 🔒Owner*_
_*❏${prefix}payqris*_
_*❏${prefix}genbotgc*_

_« Group Menu »_
_*❏${prefix}antilink < 1 / 0 >*_
_*❏${prefix}welcome < 1 / 0 >*_
_*❏${prefix}leveling < 1 / 0 >*_
_*❏${prefix}grup < buka / tutup >*_
_*❏${prefix}htag < teks >*_
_*❏${prefix}kick @tag*_
_*❏${prefix}kick < reply >*_
_*❏${prefix}linkgrup*_
_*❏${prefix}promote @tag*_
_*❏${prefix}demote @tag*_
_*❏${prefix}lapor < teks >*_
_*❏${prefix}mute*_ CoomingSoon
_*❏${prefix}unmute*_ CoomingSoon
_*❏${prefix}addfilter text|text*_ 
_*❏${prefix}afk < alasan >*_ 

_« Maker Menu »_
_*❏${prefix}tahta < teks >*_
_*❏${prefix}heker < teks >*_
_*❏${prefix}blueneon < teks >*_
_*❏${prefix}wall < teks >*_
_*❏${prefix}embun < teks >*_

_« Download Menu »_ 🔒premium
_*❏${prefix}play < query >*_
_*❏${prefix}ytmp4 < link >*_
_*❏${prefix}ytmp3 < link >*_
_*❏${prefix}tiktok < link >*_
_*❏${prefix}tiktoknowm < link >*_
_*❏${prefix}joox < query >*_
_*❏${prefix}instagram < link >*_

_« Sound Menu »_
_*❏${prefix}soundmenu*_

_« Game Menu »_ 🔒premium
_*❏${prefix}suit < gunting/batu/kertas >*_
_*❏${prefix}mancing <ikan>*_
_*❏${prefix}udara*_
_*❏${prefix}tebakumur < nama >*_
_*❏${prefix}tebakbendera*_
_*❏${prefix}truth*_
_*❏${prefix}dare*_
_*❏${prefix}tebakanime*_
_*❏${prefix}siapakahaku*_
_*❏${prefix}tebakjenaka*_
_*❏${prefix}tebaklirik*_
_*❏${prefix}tebakin*_
_*❏${prefix}tebakkimia*_
_*❏${prefix}tictactoe @tag*_

_« Stalker Menu »_
_*❏${prefix}stalkig < username >*_
_*❏${prefix}tiktokstalk < username >*_

_« Sticker Menu »_
_*❏${prefix}sticker ❌*_
_*❏${prefix}attp*_
_*❏${prefix}ttp2*_
_*❏${prefix}ttp3*_
_*❏${prefix}ttp4*_
_*❏${prefix}spatrick*_
_*❏${prefix}sdogi*_
_*❏${prefix}dadu*_
_*❏${prefix}toimg*_
_*❏${prefix}imgtourl*_

_« Tools Menu »_
_*❏${prefix}tomp3 < reply video >*_

_Kecepatan Di Utamakan_

_©Genbot_`
				reply(menunya)
				//fakestatus(menunya)
				//gen.sendMessage(from, gmenu, image, {quoted: Lan, caption: menunya})
				break
case 'soundmenu': 
const sound = ` 
➪ *iri*
➪ *ara*
➪ *bernyanyi*
➪ *pale*
➪ *pota*
➪ *welot*
➪ *alay*
➪ *bwa*
➪ *ganteng*
➪ *gatal*
➪ *ladida*
➪ *sholawat*
➪ *manis*
➪ *rusher*
➪ *boong*
➪ *gratata*
➪ *tengteng*
➪ *kaweni*
➪ *old*
➪ *zombie*
➪ *sakit*
➪ *bermain*
➪ *leriler*
➪ *sultan*
➪ *gta*
➪ *duakursi*
➪ *papip*
➪ *nomix*
➪ *sariroti*
➪ *takeme*
➪ *gemes*
➪ *mati*
➪ *sound1-7*
`
reply(sound)
break
case 'tiktoknowm':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply('Khusus Premium')
					
			  if (args.length < 1) return reply('Link nya Mana? ')
			 
			  try {
			    linknye = args.join(' ')
			    console.log(linknye)
			    reply('_Loading_')
			   const tektok = await axios.get(`https://lolhuman.herokuapp.com/api/tiktok?apikey=genbotkey&url=${linknye}`)
			   const { link, description, title, keywords, thumbnail } = tektok.data.result
			   const them = await getBuffer(thumbnail)
			   const trimtol = await getBuffer(link)
			   const cpTUN = `*Video Di Temukan*\n*Title: ${title}*\n*Key: ${keywords}*\n*Desc:* ${description}\n\n*_VIDEO SEDANG DI UPLOAD_*`
			   gen.sendMessage(from, them, image, {quoted: Lan, caption: cpTUN})
			   gen.sendMessage(from, trimtol, video, {quoted: Lan})
			  } catch {
			    reply("Tidak Dapat Di jangkau")
			  }
			  break
case 'joox':
		if (!isPrem) return reply(nad.premium(prefix))
                if (!isRegistered) return reply(nad.noregis())
    
                if (isBanned) return reply('Maaf kamu sudah terbenned!')
                   reply(nad.wait())
                    if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jooxplay?apikey=genbotkey&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.info.song}\n`
                    ini_txt += `Artists : ${get_result.info.singer}\n`
                    ini_txt += `Duration : ${get_result.info.duration}\n`
                    ini_txt += `Album : ${get_result.info.album}\n`
                    ini_txt += `Uploaded : ${get_result.info.date}\n`
                    ini_txt += `Lirik :\n ${get_result.lirik}\n`
                    thumbnail = await getBuffer(get_result.image)
                    gen.sendMessage(from, thumbnail, image, { quoted: Lan, caption: ini_txt })
                    get_audio = await getBuffer(get_result.audio[0].link)
                    gen.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.info.song}.mp3`, quoted: Lan})
                    break








				//MENU GEN BOT
case 'sewa':
				case 'sewabot':
                    ini_buffer = await getBuffer(`https://i.ibb.co/PCq3JKS/20210608-152131.jpg`)
                    gen.sendMessage(from, ini_buffer, image, { contextInfo: {mentionedJid: [sender, botNumber], isForwarded: true, forwardingScore: 300}, 
 quoted: {
  key: {
   participant: '0@s.whatsapp.net',
   remoteJid: 'status@broadcast'
  },
  message: {
   "locationMessage": {
    "name": '*Sewa Bot By GEN BOT*',  
    "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg'),
   }
  }
 }, caption: '*Jika Minat Sewa Bot*\n*Chat Wa Owner Atau*\n*Ketik #owner*' })
                    break
case 'payqris':
const web = `_*payment Qris:*_\nhttps://qris.fahrixgen.tech/`
reply(web)
break
case 'caklontong':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if (caklontong.hasOwnProperty(sender.split('@')[0])) return reply("Jawab dulu yang tadi amsu")
                    anu = await fetchJson(`https://api.vhtear.com/funkuis&apikey=Xfarbotkey`)
                    tebakya = anu.soal
                    tebak = `PERTANYAAN : ${tebakya}`
                    jawaban = anu.jawaban
                    caklontong[sender.split('@')[0]] = jawaban.toLowerCase()
                    fs.writeFileSync("./database/caklontong.json", JSON.stringify(caklontong))
                    console.log(jawaban)
                    rmln.sendMessage(from, tebak, text, { quoted: Lan })
                   await sleep(30000)
                    if (caklontong.hasOwnProperty(sender.split('@')[0])) {
                        reply("Jawaban: " + jawaban)
                        delete caklontong[sender.split('@')[0]]
                        fs.writeFileSync("./database/caklontong.json", JSON.stringify(caklontong))
                    }
                    break
				case 'family100':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if (family.hasOwnProperty(sender.split('@')[0])) return reply("Jawab dulu yang tadi amsu")
                    anu = await fetchJson(`https://x-restapi.herokuapp.com/api/family100?apikey=BETA`)
                    tebakya = anu.soal
                    tebak = `PERTANYAAN : ${tebakya}`
                    jawaban = anu.jawaban
                    family[sender.split('@')[0]] = jawaban.toLowerCase()
                    fs.writeFileSync("./database/family100.json", JSON.stringify(family))
                    console.log(jawaban)
                    rmln.sendMessage(from, tebak, text, { quoted: Lan })
                   await sleep(30000)
                    if (family.hasOwnProperty(sender.split('@')[0])) {
                        reply("Jawaban: " + jawaban)
                        delete family[sender.split('@')[0]]
                        fs.writeFileSync("./database/family100.json", JSON.stringify(family))
                    }
                    break
				
case 'tiktokstalk':

                  if (isBanned) return reply(nad.baned())
				if (!isRegistered) return reply(nad.noregis())
				
                reply(nad.wait())
			
			username = args[0]
					get_result = await fetchJson(`https://api.vhtear.com/tiktokprofile?query=${username}&apikey=Xfarbotkey`, {method: 'get'})
					get_result = get_result.result
					txt = `Link : ${get_result.url_account}\n`
					txt += `Username : ${get_result.username}\n`
					txt += `Bio : ${get_result.bio}\n`
					txt += `Followers : ${get_result.follower}\n`
					txt += `Following : ${get_result.follow}\n`
					txt += `Likes : ${get_result.like_count}\n`
					txt += `Vidio : ${get_result.video_post}\n`
					buffer = await getBuffer(get_result.picture)
					gen.sendMessage(from, buffer, image, {quoted: Lan, caption: txt})
					break
case 'suit':
if (!isRegistered) return reply(nad.noregis())  
			    if (!isPrem) return reply(nad.premium(prefix))
                  if (isBanned) return reply(nad.baned())
                  
                  const userspilih = args.join(' ')
                
                var computer = Math.random()
                if (computer < 0.34 ) {
                    computer = 'batu';
                } else if( computer >= 0.34 && computer < 0.67) {
                    computer = 'gunting';
                } else {
                    computer = 'kertas';
                }
            const lel =['4','9','5','3','7','8','10','9','4','9','2','20','6']
					const skot = lel[Math.floor(Math.random() * lel.length)]
                if ( userspilih == computer ) {
                    
                    reply(`Pertandingan kamu dengan bot Seri!`)
                    
                } else if ( userspilih == 'batu' ) {
                    if( computer == 'gunting' ) {
                        
                        reply(`🎉 KAMU MENANG 🎉\n\nKamu: ✊\nBot: ✌\n\nKamu mendapat ${skot} limit`)
                        bayarLimit(sender, skot)
                    } else {
                        reply(`😵 KAMU KALAH 😵\n\nKamu: ✊\nBot: 🖐`)
                    }
                } else if ( userspilih == 'gunting' ) {
                    if( computer == 'batu' ) {
                        
                        reply(`😵 KAMU KALAH 😵\n\nKamu: ✌\nBot: ✊`)
                    } else {
                    	reply(`🎉 KAMU MENANG 🎉\n\nKamu: ✌\nBot: 🖐\n\nKamu mendapat ${skot} limit`)
                    bayarLimit(sender, skot)
                    }
                } else if ( userspilih == 'kertas' ) {
                    if( computer == 'batu' ) {
                        
                        reply(`🎉 KAMU MENANG 🎉\n\nKamu: 🖐\nBot: ✊\n\nKamu mendapat ${skot} limit`)
                        bayarLimit(sender, skot)
                    } else {
                        reply(`😵 KAMU KALAH 😵\n\nKamu: 🖐\nBot: ✌`)
                    }
                
            } else {
                reply(`Format salah, masukkan pilihanmu\n\nContoh: ${prefix}suit kertas`)
            }
                break

case 'mancing':
if (!isPrem) return reply(nad.premium(prefix))
                  if (isBanned) return reply(nad.baned())
				if (!isRegistered) return reply(nad.noregis())
				
                reply(nad.wait())
            const buruh4 = ['🦈','🐬','🐋','🐟','🐠','🐡','🦐','🦞','🦀','🦑']
  const buruh44 = buruh4[Math.floor(Math.random() * (buruh4.length))]
  const pancing = Math.ceil(Math.random() * 10000)
						addLevelingXp(sender, pancing)
                   
                    FC = body.slice(8)
                    setTimeout( () => {
                    reply(`Sedang Memancing Silahkan Tunggu 2menit!`)
                    }, 2000)
                    
                    setTimeout( () => {
                    reply(`WOW ANDA MENDAPATKAN\n${buruh44} & ${pancing}Xp\n\n Saatnya Bakar ikan:v`)
                    }, 120000)
                    break
case 'udara':
                 if (!isPrem) return reply(nad.premium(prefix))
                  if (isBanned) return reply(nad.baned())
				if (!isRegistered) return reply(nad.noregis())
				
               
            const buruh3 = ['🦋','🕷','🐝','🐉','🦆','🦅','🕊','🐧','🐦','🦇']
  const buruh33 = buruh3[Math.floor(Math.random() * (buruh3.length))]
  const mining = Math.ceil(Math.random() * 10000)
						addLevelingXp(sender, mining)
                    if (args.length < 1) return reply(`PILIH ARAH/CARA CONTOH\n${prefix}udara tembak perlahan`)
                    FC = body.slice(7)
                    setTimeout( () => {
                    reply(`[ *PERINTAH DILAKSANAKAN* ]`)
                    }, 1000)
                    setTimeout( () => {
                    reply(`[ *${FC}* ]`)
                    }, 5000)
                    setTimeout( () => {
                    reply(`[ *SUKSES !! DAN ANDA MENDAPATKAN* ]`)
                    }, 15000)
                    setTimeout( () => {
                    reply(`[ *WOW ANDA MENDAPATKAN* ]\n[ *${buruh33} & ${mining}Xp* ]\n\n Created by genbot`)
                    }, 18000)
                    break
case 'tebakumur':
if (!isPrem) return reply(nad.premium(prefix))
                if (!isRegistered) return fakek(nad.noregis())
                
                if (isBanned) return reply('Maaf kamu sudah terbenned!')
                   reply(nad.wait())
if (args.length == 0) return reply(`Example: ${prefix + command} Gen`)
                    ini_name = args.join(" ")
                    if (args.length == 0) return reply(`Example: ${prefix + command} Gen`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/tebakumur?apikey=genbotkey&name=${ini_name}`)
                    get_result = get_result.result
                    ini_txt = `Nama : ${get_result.name}\n`
                    ini_txt += `Umur : ${get_result.age}`
                    reply(ini_txt)
                    break

					case 'tebakbendera':
if (!isPrem) return reply(nad.premium(prefix))
                if (!isRegistered) return reply(nad.noregis())
                
                if (isBanned) return reply('Maaf kamu sudah terbenned!')
                   reply(nad.wait())
anu = await fetchJson(`http://lolhuman.herokuapp.com/api/tebak/bendera?apikey=genbotkey`, {method: 'get'})
					tebakbender = `*bendera apa ini?*\n${anu.result.flag}`
					setTimeout( () => {
					gen.sendMessage(from, '*➸ Jawaban :* '+anu.result.name, text, {quoted: Lan}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, tebakbender, text, {quoted: Lan}) // ur cods
					}, 0) // 1000 = 1s,
					break 
					
					case 'truth':
					if (!isPrem) return reply(nad.premium(prefix))
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					
					
					const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengaruh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					gen.sendMessage(from, truteh, image, { caption: '*Truth*\n\n' + ttrth, quoted: Lan})
					break

				case 'dare':
				if (!isPrem) return reply(nad.premium(prefix)) 
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					
					const dare = ['Kirim pesan ke mantan kamu dan bifarg "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bifarg "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bifarg can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bifarg ke dia "i lucky to hv you', 'prank chat mantan dan bifarg " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bifarg "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belafarg, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					gen.sendMessage(from, tod, image, { quoted: Lan, caption: '*Dare*\n\n' + der })
					break
					case 'tebakanime':

				if (!isPrem) return reply(nad.premium(prefix))
                  if (isBanned) return reply(nad.baned())
				if (!isRegistered) return reply(nad.noregis())
				
                reply(nad.wait())
anu = await fetchJson(`https://api.lolhuman.xyz/api/tebakchara?apikey=genbotkey`, {method: 'get'})
					buffer = await getBuffer(`${anu.result.image}`)
                

					setTimeout( () => {
					gen.sendMessage(from, '*>¸ Jawaban :* '+anu.result.name, text, {quoted: Lan}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_10 Detik lagi_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_20 Detik lagi_', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_30 Detik lagi_', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, buffer, image, {quoted: Lan, caption: 'Siapa hayoo?' }) // ur cods
					}, 0) // 1000 = 1s,
					
					break
case 'siapakahaku':

				if (!isPrem) return reply(nad.premium(prefix))
                  if (isBanned) return reply(nad.baned())
				if (!isRegistered) return reply(nad.noregis())
				
                reply(nad.wait())
anu = await fetchJson(`https://api.lolhuman.xyz/api/tebak/siapaaku?apikey=${lolhuman}`, {method: 'get'})
					kimia = `*${anu.result.question}*\n\n *TEBAK TUH BEJIR*`
					setTimeout( () => {
					gen.sendMessage(from, '*>¸ Jawaban :* '+anu.result.answer, text, {quoted: Lan}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_10 Detik lagi_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_20 Detik lagi_', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_30 Detik lagi_', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, kimia, text, {quoted: Lan }) // ur cods
					}, 0) // 1000 = 1s,
					
					break
case 'tebakjenaka':

				if (!isPrem) return reply(nad.premium(prefix))
                  if (isBanned) return reply(nad.baned())
				if (!isRegistered) return reply(nad.noregis())
				
                reply(nad.wait())
anu = await fetchJson(`https://api.lolhuman.xyz/api/tebak/jenaka?apikey=${lolhuman}`, {method: 'get'})
					kimia = `*${anu.result.question}*\n\n *TEBAK TUH BEJIR*`
					setTimeout( () => {
					gen.sendMessage(from, '*>¸ Jawaban :* '+anu.result.answer, text, {quoted: Lan}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_10 Detik lagi_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_20 Detik lagi_', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_30 Detik lagi_', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, kimia, text, {quoted: Lan }) // ur cods
					}, 0) // 1000 = 1s,
					
					break
case 'tebaklirik':

				if (!isPrem) return reply(nad.premium(prefix))
                  if (isBanned) return reply(nad.baned())
				if (!isRegistered) return reply(nad.noregis())
				
                reply(nad.wait())
anu = await fetchJson(`https://api.lolhuman.xyz/api/tebak/lirik?apikey=${lolhuman}`, {method: 'get'})
					kimia = `*${anu.result.question}*\n\n Yang Bener Dapet cimin:v`
					setTimeout( () => {
					gen.sendMessage(from, '*>¸ Jawaban :* '+anu.result.answer, text, {quoted: Lan}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_10 Detik lagi_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_20 Detik lagi_', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_30 Detik lagi_', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, kimia, text, {quoted: Lan }) // ur cods
					}, 0) // 1000 = 1s,
					
					break
case 'tebakkimia':

				if (!isPrem) return reply(nad.premium(prefix))
                  if (isBanned) return reply(nad.baned())
				if (!isRegistered) return reply(nad.noregis())
				
                reply(nad.wait())
anu = await fetchJson(`https://api.lolhuman.xyz/api/tebak/unsurkimia?apikey=${lolhuman}`, {method: 'get'})
					kimia = `Anak kimia pasti tau, Lambang dari kata : *${anu.result.nama}*`
					setTimeout( () => {
					gen.sendMessage(from, '*>¸ Jawaban :* '+anu.result.lambang, text, {quoted: Lan}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_10 Detik lagi_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_20 Detik lagi_', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, '_30 Detik lagi_', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					gen.sendMessage(from, kimia, text, {quoted: Lan }) // ur cods
					}, 0) // 1000 = 1s,
					
					break
//ENDMENU








				case 'antidelete':
					if (!isOwner) return reply(nad.ownerb())
					const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
					const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
					const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
					const isRevoke = dataRevoke.includes(from)
					const isCtRevoke = dataCtRevoke.data
					const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
					const argz = body.split(' ')
					if (argz.length === 1) return fakestatus(`Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 62855xxxxxxx* (banlist kontak)`)
					if (argz[1] == 'aktif') {
						if (isGroup) {
							if (isRevoke) return fakestatus(`Antidelete telah diaktifkan di grup ini sebelumnya!`)
							dataRevoke.push(from)
							fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
							fakestatus(`Antidelete diaktifkan di grup ini!`)
						} else if (!isGroup) {
							fakestatus(`Untuk kontak penggunaan *${prefix}antidelete ctaktif*`)
						}
					} else if (argz[1] == 'ctaktif') {
						if (!isGroup) {
							if (isCtRevoke) return fakestatus(`Antidelete telah diaktifkan di semua kontak sebelumnya!`)
							dataCtRevoke.data = true
							fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
							fakestatus(`Antidelete diaktifkan disemua kontak!`)
						} else if (isGroup) {
							fakestatus(`Untuk grup penggunaan *${prefix}antidelete aktif*`)
						}
					} else if (argz[1] == 'banct') {
						if (isBanCtRevoke) return fakestatus(`kontak ini telah ada di database banlist!`)
						if (argz.length === 2 || argz[2].startsWith('0')) return fakestatus(`Masukan nomer diawali dengan 62! contoh 628555xxxxx`)
						dataBanCtRevoke.push(argz[2] + '@s.whatsapp.net')
						fs.writeFileSync('./src/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
						fakestatus(`Kontak ${argz[2]} telah dimasukan ke banlist antidelete secara permanen!`)
					} else if (argz[1] == 'mati') {
						if (isGroup) {
							const index = dataRevoke.indexOf(from)
							dataRevoke.splice(index, 1)
							fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
							fakestatus(`Antidelete dimatikan di grup ini!`)
						} else if (!isGroup) {
							fakestatus(`Untuk kontak penggunaan *${prefix}antidelete ctmati*`)
						}
					} else if (argz[1] == 'ctmati') {
						if (!isGroup) {
							dataCtRevoke.data = false
							fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
							fakestatus(`Antidelete dimatikan disemua kontak!`)
						} else if (isGroup) {
							fakestatus(`Untuk grup penggunaan *${prefix}antidelete mati*`)
						}
					}
					break
				case 'owner':
				case 'creator':
					gen.sendMessage(from, { displayname: "Jeff", vcard: vcard }, MessageType.contact, { quoted: Lan })
					.then((res) => gen.sendMessage(from, 'Tuh Nomor Pacarku >_<, Ehh Ownerku mksdnya:v', MessageType.text, { quoted: res }))
					break

				case 'donasi':
				case 'donate':
				gen.sendMessage(from, nad.donasi(), text, { quoted: Lan })
					break
				case 'iklan':
				gen.sendMessage(from, nad.iklan(botName, ownerNumbers, ownerName), text, { quoted: Lan })
					break

				case 'speed':
				case 'ping':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const timestamp = speed();
					const latensi = speed() - timestamp
					fakestatus(`Speed: ${latensi.toFixed(4)} _ms_`)
					break
				case 'runtime':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					runtime = process.uptime()
					runte = `「 *RUNTIME* 」\n${kyun(runtime)}`
					fakestatus(`${runte}`)
					break
					
					
				case 'sticker':
				case 'stiker':
				case 'stickergif':
				case 'stikergif':
				case 'sgif':
				case 's':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
                      const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await gen.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(ind.stikga())
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								gen.sendMessage(from, buffer, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await gen.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(ind.wait())
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(ind.stikga())
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								gen.sendMessage(from, buffer, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							} else {
						reply(`Kirim gambar/video/gif dengan caption \n${prefix}sticker (durasi sticker video 1-9 detik)`)
					}
					break				
				case 'nulis':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teksnya mana kak? Contoh : ${prefix}nulis Ramlan baik hati`)
					reply('「❗」WAIT BRO GUE NULIS DUMLU YAKAN')
					kir = await getBuffer(`https://api.zeks.xyz/api/nulis?apikey=${zeksapi}&text=${q}`)
					gen.sendMessage(from, kir, image, { quoted: Lan, caption: 'Nihh kak' })
					break

				case 'stalkig':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Masukan username!\nContoh :\n${prefix}stalkig iamramlan_`)
					anu = await fetchJson(`https://api.zeks.xyz/api/igstalk?apikey=${zeksapi}&username=${q}`)
					reply(nad.wait())
					stig = await getBuffer(anu.profile_pic)
					hasil = `*DITEMUKAN* ${q}
➣ Nama : ${anu.fullname}
➣ Follower : ${anu.follower}
➣ Following : ${anu.following}
➣ Biografi : ${anu.bio}`
					gen.sendMessage(from, stig, image, { quoted: Lan, caption: hasil })
					break 

				case 'tts':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return gen.sendMessage(from, `Kode bahasanya mana kak? contoh : ${prefix}tts id Halo Ramlan`, text, { quoted: Lan })
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return gen.sendMessage(from, `Teksnya mana kak | contoh : ${prefix}tts id ah yamate kudasai`, text, { quoted: Lan })
					var bby = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					bby.length > 300
						? reply('Teks nya terlalu panjang kak')
						: gtts.save(ranm, bby, function () {
							exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
								fs.unlinkSync(ranm)
								buff = fs.readFileSync(rano)
								if (err) return reply(nad.stikga())
								gen.sendMessage(from, buff, audio, { quoted: Lan, ptt: true })
								fs.unlinkSync(rano)
							})
						})
					break

				case 'ttp':  
                    if (args.length == 0) return reply(`Contoh : ${prefix + command} Gen`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`https://pecundang.herokuapp.com/api/texttopng?teks=${ini_txt}`)
                    gen.sendMessage(from, ini_buffer, sticker, { quoted: Lan })
                    break
case 'ttp2':
                case 'ttp3':
                case 'ttp4':  
                    if (args.length == 0) return reply(`Contoh : ${prefix + command} Gen`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/${command}?apikey=genbotkey&text=${ini_txt}`)
                    gen.sendMessage(from, ini_buffer, sticker, { quoted: Lan })
                    break
case 'spatrick':
					ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/sticker/patrick?apikey=genbotkey`)
                    gen.sendMessage(from, ini_buffer, sticker, { quoted: Lan })
                    break
					case 'dadu':
					ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/sticker/dadu?apikey=genbotkey`)
                    gen.sendMessage(from, ini_buffer, sticker, { quoted: Lan })
                    break
					case 'sdogi':
					ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/sticker/anjing?apikey=genbotkey`)
                    gen.sendMessage(from, ini_buffer, sticker, { quoted: Lan })
                    break
case 'striggered':
				if (!isRegistered) return reply(nad.noregis())
					if (isBanned) return reply(nad.baned())
				if (!isPrem) return reply(nad.premium(prefix))
					if (isLimit(sender)) return reply(nad.limitend(pusname, prefix))
					await limitAdd(sender)
				var imgbb = require('imgbb-uploader')     
				if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
				ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo : Lan
				reply(nad.wait)
				owgi = await gen.downloadAndSaveMediaMessage(ger) 
				anu = await imgbb('68cb5bee517bce4f74b0e910a5d96346', owgi)               
				teks = `${anu.display_url}`
				titid = await getBuffer(`https://pecundang.herokuapp.com/api/triggeredwebp?url=${teks}`, {method: 'get'})                    
				gen.sendMessage(from, titid, sticker, {quoted : Lan}) 
				}		
				break
case 'amongus':
		if (!isPrem) return reply(nad.premium(prefix))
                  if (isBanned) return reply(nad.baned())
				if (!isRegistered) return reply(nad.noregis())
				if (isLimit(sender)) return reply(nad.limitend(pusname)) 
                reply(nad.wait())
                    if (args.length == 0) return reply(`Usage: ${prefix + command} query\nContoh: ${prefix + command} GEN`)
                    buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/amongus?apikey=genbotkey&text=${body.slice(9)}`)
                    gen.sendMessage(from, buffer, sticker, { quoted: Lan})
                    break
				case 'attp':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}attp BOT`)
					atetepe = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
					gen.sendMessage(from, atetepe, sticker, { quoted: Lan })
					break

				case 'simi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Mau Ngapain?\nContoh :\n${prefix}simi halo`)
					anu = await fetchJson(`https://api.zeks.xyz/api/simi?apikey=${zeksapi}&text=${q}`)
					reply(anu.result)
					break

				case 'quotes':
					gen.updatePresence(from, Presence.composing)
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					data = fs.readFileSync('./R4ML4N/quote.json');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					randQuote = '' + randKey.quote + '\n\n_By: ' + randKey.by + '_'
					fakestatus(randQuote)
					break

				case 'bikinquote':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(12)
					var quote = gh.split("&")[0];
					var wm = gh.split("&")[1];
					const pref = `yang mau dijadiin quote apaan, titit?\ncontoh :\n${prefix}bikinquote Ya & Kata Ramlan`
					if (args.length < 1) return reply(pref)
					reply(nad.wait())
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=random`, { method: 'get' })
					biquote = await getBuffer(anu.result)
					gen.sendMessage(from, biquote, image, { caption: 'Nih kak >_<', quoted: Lan })
					break
				
				case 'nsfw':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}nsfw 1`)
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('Sudah Aktif Kak')
						nsfw.push(from)
						fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
						reply('「 SUKSES 」Fitur NSFW Diaktifkan')
					} else if (Number(args[0]) === 0) {
						if (!isNsfw) return reply('Sudah Mati Kak')
						var ini = nsfw.indexOf(from)
						nsfw.splice(ini, 1)
						fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
						reply('「 SUKSES 」Fitur NSFW Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
				case 'antibadword':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antibadword 1`)
					if (Number(args[0]) === 1) {
						if (isBadWord) return reply('Sudah Aktif Kak')
						badword.push(from)
						fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
						reply('「 SUKSES 」Fitur Anti Badword Diaktifkan')
						gen.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti Badword\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
					} else if (Number(args[0]) === 0) {
						if (!isBadWord) return reply('Sudah Mati Kak')
						var ini = badword.indexOf(from)
						badword.splice(ini, 1)
						fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
						reply('「 SUKSES 」Fitur Anti Badword Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'afk':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (isAfkOn) return await reply('Kau Sudah AFK Di Group Lain')
					const aepka = body.slice(5)
					const reason = aepka ? aepka : 'Gak Jelas'
					addAfkUser(sender, time, reason, _afk)
					gen.sendMessage(from, `「 *BERHASIL AFK* 」
${a}Dengan Data Berikut :${a}
${a}Nama : ${pushname}${a}
${a}Alasan : ${reason}${a}
${a}Dinyatakan Telah AFK!${a}
`, text, { quoted: Lan })
					break

				case 'welcome':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}welcome 1`)
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Sudah Aktif Kak')
						welkom.push(from)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('_*「 SUKSES 」Fitur Welcome Diaktifkan*_')
					} else if (Number(args[0]) === 0) {
						if (!isWelkom) return reply('Sudah Mati Kak')
						welkom.splice(from, 1)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('_*「 SUKSES 」Fitur Welcome Dimatikan*_')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'leveling':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}leveling 1`)
					if (Number(args[0]) === 1) {
						if (isLevelingOn) return reply('Sudah Aktif Kak')
						_leveling.push(from)
						fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
						reply('_*「 Leveling 」*_\n_Sudah Aktif_')
					} else if (Number(args[0]) === 0) {
						_leveling.splice(from, 1)
						fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
						reply('_*「 Leveling 」*_\n_Dimatikan_')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'antilink':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antilink 1`)
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('Sudah Aktif Kak')
						antilink.push(from)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						reply('_*「 AntiLink 」*_\n_Sudah Aktif_')
						
					} else if (Number(args[0]) === 0) {
						if (!isAntiLink) return reply('Sudah Mati Kak')
						var ini = antilink.indexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						reply('_*「 AntiLink 」*_\n_Dimatikan_')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'grup':
				case 'group':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk membuka : ${prefix}group buka\nuntuk menutup : ${prefix}group tutup`)
					if (args[0] === 'buka') {
						reply(`_*Group Berhasil Di Buka*_`)
						gen.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`_*Group Berhasl Di Tutup*_`)
						gen.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break


				case 'admin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					adm = `*ATASAN GROUP* _${groupMetadata.subject}_\n*TOTAL* : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						adm += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(adm, groupAdmins, true)
					break

				case 'add':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply('Yang mau di add siapa?')
					if (args[0].startsWith('08')) return reply('Gunakan kode bahasa kak')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						gen.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Anjim yang mau di add di private, dahlah :)')
					}
					break

				case 'kick':
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 ??𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱?? 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝗔𝘀𝗲𝗸 𝗱𝗮𝗽𝗮𝘁 𝗺𝗮𝗸𝗮𝗻𝗮𝗻,𝗼𝘁𝘄 𝗸𝗶𝗰𝗸 🏃 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
					gen.groupRemove(from, mentioned)
					} else {
						mentions(`*Perintah Di Terima, Mengeluarkan :* @${mentioned[0].split('@')[0]} 👋`, mentioned, true)
						gen.groupRemove(from, mentioned)
					}
					break
					
					case 'htag':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					var value = body.slice(6)
					var group = await gen.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: Lan
					}
					gen.sendMessage(from, options, text)
					break
				case 'hidetag20':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isGroup) return reply(nad.groupo())
					var value = body.slice(11)
					var group = await gen.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: Lan
					}
					gen.sendMessage(from, options, text)
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                 .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
	                .then(() => {gen.sendMessage(from, options, text)})
					break

				case 'level':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isLevelingOn) return reply(nad.lvlnoon())
					if (!isGroup) return reply(nad.groupo())
					const userLevel = getLevelingLevel(sender)
					const userXp = getLevelingXp(sender)
					if (userLevel === undefined && userXp === undefined) return reply(nad.lvlnul())
					const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
					resul = `*「 LEVEL 」*\n_*➣ Nama : ${pushname}*_\n_*➣ Number : wa.me/${sender.split("@")[0]}*_\n_*➣ Xp : ${userXp}/${requiredXp}*_\n_*➣ Level : ${userLevel}*_`
					gen.sendMessage(from, resul, text, { quoted: Lan })
						.catch(async (err) => {
							console.error(err)
							await reply(`Error!\n${err}`)
						})
					break

				case 'linkgrup':
				case 'linkgroup':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					linkgc = await gen.groupInviteCode(from)
					yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
					gen.sendMessage(from, yeh, text, { quoted: Lan })
					break

				case 'tagall':
					if (isBanned) return reply(nad.baned())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*~>* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break

				case 'setname':
				if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					gen.groupUpdateSubject(from, `${body.slice(9)}`)
					gen.sendMessage(from, '「 SUKSES 」Mengubah Nama Grup', text, { quoted: Lan })
					break

				case 'setdesc':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					gen.groupUpdateDescription(from, `${body.slice(9)}`)
					gen.sendMessage(from, '*「 SUKSES 」Mengubah Desk Grup', text, { quoted: Lan })
					break
case 'lapor': 
					if (args.length < 1) return fakestatus('Apa pesan nya?')
					var cie = body.slice(7)
				    reply(`*Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi*`)
					sendMess(`6283164159553@s.whatsapp.net`, `Dari : wa.me/${sender.replace('@s.whatsapp.net', '')}\nNAMA : ${pushname}\nLAPORAN : ${cie}`)
					break

				case 'demote':
				case 'demot':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						dem = ''
						for (let _ of mentioned) {
							dem += `*jabatan kamu di copot*🏃 :\n`
							dem += `@_.split('@')[0]`
						}
						mentions(dem, mentioned, true)
						gen.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Yahh @${mentioned[0].split('@')[0]} Jabatan kamu sebagai leluhur di grup telah di copot🏃`, mentioned, true)
						gen.groupDemoteAdmin(from, mentioned)
					}
					break

				case 'promote':
				case 'promot':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('Tag Orang Nya Kak')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						prom = ''
						for (let _ of mentioned) {
							prom += `Yeee🥳 Kamu naik jabatan >_< :\n`
							prom += `@_.split('@')[0]`
						}
						mentions(prom, mentioned, true)
						gen.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Selamat🥳 @${mentioned[0].split('@')[0]} *anda naik menjadi admin group* >_<`, mentioned, true)
						gen.groupMakeAdmin(from, mentioned)
					}
					break

				case 'hedsot':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('Tag Orang Nya Kak')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						heds = 'Bismillah Hedsot >_< :\n'
						for (let _ of mentioned) {
							heds += `@${_.split('@')[0]}\n`
						}
						mentions(heds, mentioned, true)
						gen.groupRemove(from, mentioned)
						mentions(heds, mentioned, true)
						gen.groupAdd(from, [num])
					} else {
						mentions(`Berhasil Meng hedsot kepalanya  : @${mentioned[0].split('@')[0]}`, mentioned, true)
						gen.groupRemove(from, mentioned)
					}
					break

				case 'fitnah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (args.length < 1) return reply(`Gini kak : ${prefix}fitnah [@tag&pesan&balasanbot]\n\nContoh : ${prefix}fitnah @tagmember&hai&hai juga`)
					var gh = body.slice(8)
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("&")[0];
					var target = gh.split("&")[1];
					var bot = gh.split("&")[2];
					gen.sendMessage(from, `${bot}`, text, { quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` } } })
					break

				case 'leave':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					
					setTimeout(() => {
						gen.groupLeave(from)
					}, 2000)
					setTimeout(() => {
						gen.updatePresence(from, Presence.composing)
						if (!isRegistered) return reply(nad.noregis())
						if (isBanned) return reply(nad.baned())
						fakestatus('Aku pamit kak:)')
					}, 0)
					break

				case 'del':
				case 'delete':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					gen.deleteMessage(from, { id: Lan.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break

				case 'mining':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isEventon) return reply(`maaf ${pushname} event mining tidak di aktifkan sama owner ${ownerName}`)
					if (isOwner) {
						const one = 999999999
						addLevelingXp(sender, one)
						addLevelingLevel(sender, 99)
						reply(`karena ${ownerName} baik Bot memberikan ${one}Xp >_<`)
					} else {
						const mining = Math.ceil(Math.random() * 10000)
						addLevelingXp(sender, mining)
						await reply(`*selamat* ${pushname} kamu mendapatkan *${mining}Xp*`)
					}
					break

				
//------------------< Downloader >-------------------
case 'facebook':
case 'fb':
if (!isPrem) return reply('Khusus Premium')
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}facebook url`)
if(!isUrl(args[0]) && !args[0].includes('facebook')) return reply('Link tidak valid')
ngen = args.join(' ')
reply(nad.wait())
res = await fbDown(ngen).catch(e => {
  reply('Error!')
})
a = res[0]
result = `*「 FACEBOOK DOWNLOAD 」*

➸ *Judul :* ${a.judul}
➸ *Size :* ${a.size}
➸ *Source :* ${a.source}
➸ *Kualitas :* ${a.quality}

[WAIT] Proses Dumlu Yakan`
sendFileFromUrl(a.thumb, image, {caption: result, quoted: Lan})
sendFileFromUrl(a.link, video, { mimetype: 'video/mp4',quoted: Lan, filename: `${a.judul}.${a.type}`})
                .catch((err) => {
                    sendMess(ownerNumber, 'Fb Error : ' + err)
                    console.log(color('[FB]', 'red'), err)
					reply('Error!')
                })
break
case 'ytmp3':
if (!isPrem) return reply('Khusus Premium')
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}ytmp3 url`)
if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link tidak valid!')
ngen = args.join(' ')
reply(nad.wait())
res = await y2mateA(ngen).catch(e => {
reply('Error!')
})
result = `*「 YOUTUBE AUDIO 」*

➸ *Judul :* ${res[0].judul}
➸ *Ukuran :* ${res[0].size}
➸ *Kualitas :* ${res[0].quality}kbps

[WAIT] Proses Dumlu Yakan`
sendFileFromUrl(res[0].thumb, image, {caption: result, quoted: Lan}).then((lalu) => {
sendFileFromUrl(res[0].link, audio, {quoted: Lan, mimetype: 'audio/mp4', filename: res[0].output})
})
                .catch((err) => {
                    sendMess(ownerNumber, 'YTMp3 Error : ' + err)
                    console.log(color('[YTMP3]', 'red'), err)
					reply('Error!')
                })
break
case 'ytmp4':
if (!isPrem) return reply('Khusus Premium')
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}ytmp4 url`)
if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link tidak valid!')
ngen = args.join(' ')
reply(nad.wait())
res = await y2mateV(ngen).catch(e => {
reply('Error!')
})
result = `*「 YOUTUBE VIDEO 」*

➸ *Judul :* ${res[0].judul}
➸ *Ukuran :* ${res[0].size}
➸ *Kualitas :* ${res[0].quality}p
➸ *Nama File :* ${res[0].output}
➸ *Output :* ${res[0].tipe}

[WAIT] Proses Dumlu Yakan`
sendFileFromUrl(res[0].thumb, image, {caption: result, quoted: Lan}).then((lalu) => {
sendFileFromUrl(res[0].link, video, {quoted: Lan, mimetype: 'video/mp4', filename: res[0].output})
})
                .catch((err) => {
                    sendMess(ownerNumber, 'YTMp4 Error : ' + err)
                    console.log(color('[YTMP4]', 'red'), err)
					reply('Error!')
                })
break
case 'play':
if (!isPrem) return reply('Khusus Premium')
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}play judul`)
ngen = args.join(' ')
reply(nad.wait())
res = await yts(`${ngen}`).catch(e => {
reply('Error')
})
let thumbInfo = `*「 YOUTUBE PLAY 」*
➸ *Judul :* ${res.all[0].title}
➸ *ID :* ${res.all[0].videoId}
➸ *Views :* ${res.all[0].views}
➸ *Durasi :* ${res.all[0].timestamp}

[WAIT] Proses Dumlu Yakan`
sendFileFromUrl(res.all[0].image, image, {quoted: Lan, caption: thumbInfo})
res = await y2mateA(res.all[0].url).catch(e => {
reply('Error')
})
sendFileFromUrl(res[0].link, audio, {quoted: Lan, mimetype: 'audio/mp4', filename: res[0].output})
                .catch((err) => {
                    sendMess(ownerNumber, 'YTPlay Error : ' + err)
                    console.log(color('[PLAYMP3]', 'red'), err)
					reply('Error!')
                })
break
                case 'tiktok':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}tiktok url`)
if(!isUrl(args[0]) && !args[0].includes('vt.tiktok.com')) return reply('Link tidak valid')
                reply(nad.wait())
                axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=genbotkey&url=${body.slice(8)}`)
                .then(({data}) => {
                    let { title, description, duration, link } = data.result
                    let capt = `*「 TIKTOK DOWNLOAD 」*

➸ Judul : ${title}
➸ Username : ${data.result.author.username}
➸ Nickname : ${data.result.author.nickname}
➸ Duration : ${duration}
➸ Descripttion : ${description}
`
                    sendFileFromUrl(link, video, { mimetype: 'video/mp4', quoted: Lan })
                })
                .catch(() => {
                    axios.get(`https://api.lolhuman.xyz/api/tiktok2?apikey=YukinoApi&url=${body.slice(8)}`)
                    .then(({data}) => {
                        sendFileFromUrl(data.result, video, { mimetype: 'video/mp4', quoted: Lan })
                    })
                    .catch(() => {
                        axios.get(`https://api.lolhuman.xyz/api/tiktok3?apikey=YukinoApi&url=${body.slice(8)}`)
                        .then(({data}) => {
                        sendFileFromUrl(data.result, video, { mimetype: 'video/mp4', quoted: Lan })
                        })
                    .catch(() => {
                        axios.get(`https://toksaver.com/convertok?url=${body.slice(8)}`)
                        .then(({data}) => {
                        sendFileFromUrl(data.data.no_watermark, video, { mimetype: 'video/mp4', quoted: Lan })
                        })
                        .catch((err) => {
                            sendMess(ownerNumber, 'Tiktok Error : ' + err)
                            console.log(color('[Tiktok]', 'red'), err)
                            reply('Error!')
                        })
                    })
                })
              })
                break
                case 'tiktokmp3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}tiktok url`)
if(!isUrl(args[0]) && !args[0].includes('vt.tiktok.com')) return reply('Link tidak valid')
                reply(nad.wait())
                sendFileFromUrl(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=YukinoApi&url=${body.slice(11)}`, audio, {mimetype: 'audio/mp4', quoted: Lan})
                .catch((err) => {
                sendMess(ownerNumber, 'Tiktok Mp3 Error : ' + err)
                console.log(color('[TTMP3]', 'red'), err)
                reply('Error')
                })
                break
                case 'instagram':
                if (!isPrem) return reply('Khusus Premium')
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}instagram url`)
if(!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply('Link tidak valid')
                reply(nad.wait())
                axios.get(`https://api.zeks.xyz/api/ig?apikey=Kuv-Apibcbscbsjckjkbjkjcsbjbcj&url=${body.slice(11)}`)
                .then(({data}) => {
                let { url, type } = data.result[0]
                let ige = `*「 INSTAGRAM DOWNLOAD 」*

C A P T I O N
${data.caption}`
                if (type == 'jpg') {
                sendFileFromUrl(url, image, {quoted: Lan, caption: ige})// disini send image
                } else {
                sendFileFromUrl(url, video, { mimetype: 'video/mp4', quoted: Lan, caption: ige})// disni send video
                }
                })
                        .catch((err) => {
                sendMess(ownerNumber, 'Instagram Error : ' + err)
                console.log(color('[INSTAGRAM]', 'red'), err)
                reply('Error')
                })
                      break
				
// LOL
				case 'coffetext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hartatahta Rara`)
					reply('[☕] Kopi 30.000 Ya Bruh')
					sendFileFromUrl(`https://api.lolhuman.xyz/api/photooxy1/coffe?apikey=YukinoApi&text=${q}`, image, {quoted: Lan, caption: 'Jangan lupa bayar'})
					.catch(() => reply('Error'))
					break
				case 'pubglogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(10)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}pubglogo Ramlan & Rara`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.lolhuman.xyz/api/photooxy2/pubg?apikey=Yukinoapi&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
                    // Ephoto 360 //
                case 'wetglass':
                case 'multicolor3d':
                case 'watercolor':
                case 'luxurygold':
                case 'galaxywallpaper':
                case 'lighttext':
                case 'beautifulflower':              
                case 'puppycute':
                case 'royaltext':
                case 'heartshaped':
                case 'birthdaycake':
                case 'galaxystyle':
                case 'hologram3d':
                case 'greenneon':                
                case 'glossychrome':
                case 'greenbush':
                case 'metallogo':
                case 'noeltext':
                case 'glittergold':
                case 'textcake':
                case 'starsnight':                
                case 'wooden3d':
                case 'textbyname':
                case 'writegalacy':
                case 'galaxybat':
                case 'snow3d':
                case 'birthdayday':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if (args.length < 1) return reply(`Example: ${prefix + command} Rara`)
                    reply(nad.wait())
                    ini_txt = args.join(" ")
                    sendFileFromUrl(`https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=YukinoApi&text=${ini_txt}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
// MAKERMENU GENBOT
				case 'tahta':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}tahta genbot`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/hartatahta?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'blueneon':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}blueneon genbot`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/bneon?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break					
				case 'heker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hekertext genbot`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/matrix?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'wall':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}breakwall genbot`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/breakwall?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'embun':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}embuntext genbot`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/dropwater?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'wolflogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(10)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wolflogo Ramlan & Rara`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/wolflogo?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'retrologo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(10)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					var teks3 = gh.split("&")[2];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}retrologo Babybot & Ramlan & Rara`)
					axios.get(`https://api.zeks.xyz/api/retro?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}&text3=${teks3}`)
					.then(({data}) => {
					sendFileFromUrl(data.result, image, { quoted: Lan })
					})
					.catch(() => reply('Error'))
					break
case 'arcade8bit':
                if (!isRegistered) return reply(nad.noregis())
                if (isLimit(sender)) return reply(nad.limitend(pusname))
                reply(nad.wait())
                    if (args.length == 0) return reply(`Usage: ${prefix + command} text\nExample: ${prefix + command} Gen|Bot`)
                    ini_txt1 = args[0]
                    ini_txt2 = args[1]
                    buffer = await getBuffer(`https://api.lolhuman.xyz/api/photooxy2/${command}?apikey=genbotkey&text1=${ini_txt1}&text2=${ini_txt2}`)
                    gen.sendMessage(from, buffer, image, { quoted: Lan })
                    break
				case 'firetext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}firetext Ramlan`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/tfire?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'sandwrite':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sandwrite Ramlan`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/sandw?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'epeplogo':
				case 'fflogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}epeplogo Ramlan`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/epep?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'yutubgold':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}yutubgold Ramlan`)
					reply('[😱] Yutuber Bwang?')
					sendFileFromUrl(`https://api.zeks.xyz/api/gplaybutton?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'yutubsilver':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}yutubsilver Ramlan`)
					reply('[😱] Yutuber Bwang?')
					sendFileFromUrl(`https://api.zeks.xyz/api/splaybutton?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'text3dbox':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}text3dbox Ramlan`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/text3dbox?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'avengerslogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(14)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}avengerslogo Ramlan & Rara`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/logoaveng?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'pornhub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(9)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}pornhub Ramlan & Rara`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/phlogo?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'blackpink':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}blackpink Rara`)
					reply('[😱] Hah Blekping :v')
					sendFileFromUrl(`https://api.zeks.xyz/api/logobp?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'thundername':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}thundername Rara`)
					reply('[❗] Wait Bro Pasti Kemren Neh...')
					sendFileFromUrl(`https://api.zeks.xyz/api/thundertext?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break		
				case 'glitchtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(11)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glitchtext Ramlan & Rara`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/gtext?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break

				
            case 'delttt':
            case 'delttc':
            
                if (!isGroup)return reply(nad.groupo())
                if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                tictactoe.splice(getPosTic(from, tictactoe), 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                break
					case 'tictactoe':
					if (!isPrem) return reply('Khusus Premium')
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
                if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                if (args.length < 1) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                if (Lan.message.extendedTextMessage != undefined){
                    mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
                        mentions(monospace(`@${sender.split('@')[0]} menantang @${mentioned[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/T) untuk bermain`), [sender, mentioned[0]], false)
                        tictactoe.push({
                            id: from,
                            status: null,
                            penantang: sender,
                            ditantang: mentioned[0],
                            taruhan: 0,
                            TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                        })
                } else {
                    reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                }
                break
				case 'ganteng':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					jds = []
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					tejs = `Cowok paling ganteng di group ini adalah\n*@${aku.jid.split('@')[0]}*`
					jds.push(aku.jid)
					mentions(tejs, jds, true)
					break
				case 'cantik':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					jds = []
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					tejs = `Cewek️ paling cantik di group ini adalah\n*@${cintax.jid.split('@')[0]}*`
					jds.push(cintax.jid)
					mentions(tejs, jds, true)
					break
				case 'jadian':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					jds = []
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					tejs = `Ciee.. yang lagi jadian\n*@${aku.jid.split('@')[0]}* ♥️ *@${cintax.jid.split('@')[0]}*\nSemoga Langgeng Hii`
					jds.push(aku.jid)
					jds.push(cintax.jid)
					mentions(tejs, jds, true)
					break
				case 'seberapagay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
				anu = await fetchJson(`https://arugaz.herokuapp.com/api/howgay`, {method: 'get'})
				hasil = `Nih Liat Data Gay Si ${q}\n\n\nPersentase Gay : ${anu.persen}%\nAlert!!! : ${anu.desc}`
				reply(hasil)
				break
				case 'tebakin':
				if (!isPrem) return reply('Khusus Premium')
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if (tebakgambar.hasOwnProperty(sender.split('@')[0])) return reply("Jawab dulu yang tadi amsu")
                    anu = await fetchJson(`https://api.zeks.xyz/api/tebakgambar?apikey=${zeksapi}`)
                    resu = anu.result
                    tebak = resu.soal
                    jawaban = resu.jawaban
                    tebakgambar[sender.split('@')[0]] = jawaban.toLowerCase()
                    fs.writeFileSync("./database/tebakgambar.json", JSON.stringify(tebakgambar))
                    console.log(jawaban)
                    tebakya = await getBuffer(tebak)
                    gen.sendMessage(from, tebakya, image, { quoted: Lan, caption: "Jawab Ya! Gak Bisa Jawab Donasi:v" })
                   await sleep(30000)
                    if (tebakgambar.hasOwnProperty(sender.split('@')[0])) {
                        reply("Jawaban: " + jawaban)
                        delete tebakgambar[sender.split('@')[0]]
                        fs.writeFileSync("./database/tebakgambar.json", JSON.stringify(tebakgambar))
                    }
                    break
				
				case 'bisakah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					bisakah = body.slice(1)
					const bisa = ['Tentu Saja Bisa! Kamu Adalah Orang Paling Homky', 'Gak Bisa Ajg Aowkwowk', 'Hmm Gua Gak Tau Yaa, tanya ama bapakau', 'Ulangi Tod Gua Ga Paham']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					gen.sendMessage(from, 'Pertanyaan : *' + bisakah + '*\n\nJawaban : ' + keh, text, { quoted: Lan })
					break
					case 'kapankah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					kapankah = body.slice(1)
					const kapan = ['Besok', 'Lusa', 'Tadi', '4 Hari Lagi', '5 Hari Lagi', '6 Hari Lagi', '1 Minggu Lagi', '2 Minggu Lagi', '3 Minggu Lagi', '1 Bulan Lagi', '2 Bulan Lagi', '3 Bulan Lagi', '4 Bulan Lagi', '5 Bulan Lagi', '6 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', '6 Tahun Lagi', '1 Abad lagi', '3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					gen.sendMessage(from, 'Pertanyaan : *' + kapankah + '*\n\nJawaban : ' + koh, text, { quoted: Lan })
					break

				case 'apakah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					apakah = body.slice(1)
					const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Ulangi bro gak paham']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					gen.sendMessage(from, 'Pertanyaan : *' + apakah + '*\n\nJawaban : ' + kah, text, { quoted: Lan })
					break

				case 'rate':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					rate = body.slice(1)
					const ra = ['4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					gen.sendMessage(from, 'Pertanyaan : *' + rate + '*\n\nJawaban : ' + te + '%', text, { quoted: Lan })
					break

				case 'hobby':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					hobby = body.slice(1)
					const hob = ['Desah Di Game', 'Ngocokin Doi', 'Stalking sosmed nya mantan', 'Kau kan gak punya hobby awokawok', 'Memasak', 'Membantu Atok', 'Mabar', 'Nobar', 'Sosmedtan', 'Membantu Orang lain', 'Nonton Anime', 'Nonton Drakor', 'Naik Motor', 'Nyanyi', 'Menari', 'Bertumbuk', 'Menggambar', 'Foto fotoan Ga jelas', 'Maen Game', 'Berbicara Sendiri']
					const by = hob[Math.floor(Math.random() * hob.length)]
					gen.sendMessage(from, 'Pertanyaan : *' + hobby + '*\n\nJawaban : ' + by, text, { quoted: Lan })
					break

				

				case 'cekbapak': // By Ramlan ID
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const bapak = ['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Ramlan ID']
					const cek = bapak[Math.floor(Math.random() * bapak.length)]
					gen.sendMessage(from, cek, text, { quoted: Lan })
					break

				
				case 'gachacewek':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					data = fs.readFileSync('./R4ML4N/cewek.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, Lan, 'Jadi Gimana Bwang?:v')
					break
					case 'citacita':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					anu = await fetchText('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')
					    .then(async (oh) => {
                        const cita = oh.split('\n')
                        const randomCita = cita[Math.floor(Math.random() * cita.length)]
                        citata = await getBuffer(randomCita)
                        gen.sendMessage(from, citata, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
                    })
                    .catch(async (err) => {
                        reply('Error!')
                    })
                    break
					

				case 'gachacowok':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					data = fs.readFileSync('./R4ML4N/cowok.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, Lan, 'Jadi Gimana Mba?:v')
					break

				case 'meme':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					anu = await fetchJson(`https://api.zeks.xyz/api/memeindo?apikey=${zeksapi}`)
					reply(nad.wait())
					mimi = await getBuffer(anu.result)
					gen.sendMessage(from, mimi, image, { quoted: Lan })
					break

				case 'darkjokes':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					data = fs.readFileSync('./R4ML4N/darkjokes.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, Lan, '*GELAP BOS :V*')
					break
//------------------< VVIBU >-------------------
            case 'waifu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/sfw/waifu')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'nekonime':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/sfw/neko')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'megumin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/sfw/megumin')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'shinobu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/sfw/shinobu')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'loli':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
                sendFileFromUrl(`https://api.lolhuman.xyz/api/random/loli?apikey=YukinoApi`, image, {quoted: Lan})
                .catch(() => reply('Error!'))
                break
            case 'sagiri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
                sendFileFromUrl(`https://api.lolhuman.xyz/api/random/sagiri?apikey=YukinoApi`, image, {quoted: Lan})
                .catch(() => reply('Error!'))
                break
				case 'estetik':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/estetikpic?apikey=${zeksapi}`, image, {quoted: Lan})
                .catch(() => reply('Error!'))
                break
				
				
// HENTAI 
            case 'randomhentong':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					if (!isPrem) return reply(nad.premium(prefix))
					reply(nad.wait())
					axios.get('http://api-melodicxt-3.herokuapp.com/api/random/hentai?apiKey=administrator')
					.then(({data}) => {
					let { result } = data.result
						sendFileFromUrl(result, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'doujin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					if (!isPrem) return reply(nad.premium(prefix))
					if (args.length < 1) return reply(`Format salah! Ex : ${prefix}doujin 344253`)
					reply(nad.wait())
					axios.get(`https://api.lolhuman.xyz/api/nhentaipdf/${body.slice(9)}?apikey=YukinoApi`)
					.then(({data}) => {
					sendFileFromUrl(data.result, document, {quoted: Lan, mimetype: 'application/pdf', filename: `${body.slice(9)}.pdf`})
						})
						.catch(() => reply('Error!'))
                      break
            case 'waifuhentai':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/nsfw/waifu')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'nsfwneko':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/nsfw/neko')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'nsfwtrap':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/nsfw/trap')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'nsfwblowjob':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/nsfw/blowjob')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
// END								
					case 'kemonomimi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/kemonomimi-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break
					case 'nsfwkitsune':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/kitsune-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break

					case 'nsfwyuri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/yuri-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break
					
					case 'nsfwboobs':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/boobs-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break
					case 'nsfwkuni':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/kuni-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break
				
					case 'shit':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await gen.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/shit?url=${trig}`)
						gen.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'greyscale':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await gen.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/greyscale?url=${trig}`)
						gen.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'blur':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await gen.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/pixelate?url=${trig}`)
						gen.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'sampah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await gen.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/trash?url=${trig}`)
						gen.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'beautiful':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await gen.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/beautiful?url=${trig}`)
						gen.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'wanted':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await gen.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/wanted?url=${trig}`)
						gen.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'gay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await gen.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/gay?url=${trig}`)
						gen.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break										
					case 'makecalender':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await gen.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api.zeks.xyz/api/calender?apikey=${zeksapi}&image=${trig}`)
						gen.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
				case 'webdav':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!q) return fakestatus('Format Salah')
					exec(`curl -T ./DEPES/index.html ${q}`, (err, stdout) => {
						if (err) return fakestatus(`root@cognita~# ${err}`)
						if (stdout) {
						}
						fakestatus(`root@cognita~# Success Uploading to ${q}`)
					})
					break
				case 'fakedeface':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					var nn = body.slice(12)
					var urlnye = nn.split("|")[0];
					var titlenye = nn.split("|")[1];
					var descnye = nn.split("|")[2];
					imgbbb = require('imgbb-uploader')
					run = getRandom('.jpeg')
					encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ddatae = await imageToBase64(JSON.stringify(media).replace(/\"/gi, ''))

					gen.sendMessage(from, {

						text: `${urlnye}`,

						matchedText: `${urlnye}`,

						canonicalUrl: `${urlnye}`,

						description: `${descnye}`,

						title: `${titlenye}`,

						jpegThumbnail: ddatae
					}, 'extendedTextMessage', { detectLinks: false })
					break
				case 'dork':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!q) return fakestatus('Format Salah')
					try {
						fakestatus(`Otw...`)
						anudorkw2 = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/dorking?dork=${q}`, { method: 'get' })
						hasildork = `${anudorkw2.result}`
						fakestatus(hasildork)
					} catch (err) {
						fakestatus(`Error: ${err}`)
					}
					break
					case 'nmap':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!q) return fakestatus('Format Salah')
					exec(`nmap ${q}`, (err, stdout) => {
						if (err) return fakestatus(`root@cognita~# ${err}`)
						if (stdout) {
							fakestatus(`root@cognita~# ${stdout}`)
						}
					})
					break
				case 'tomp3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					gen.updatePresence(from, Presence.composing)
					if (!isQuotedVideo) return reply('Reply Video Nya Kak')
					reply(nad.wait())
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal Kak Coba Ulangi:)')
						mhee = fs.readFileSync(ran)
						gen.sendMessage(from, mhee, audio, { mimetype: 'audio/mp4', quoted: Lan })
						fs.unlinkSync(ran)
						//await sleep(2000)
					})
					break

				case 'toimg':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedSticker) return reply('Reply Sticker Nya Kak')
					reply(nad.wait())
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(nad.stikga())
						buffer = fs.readFileSync(ran)
						gen.sendMessage(from, buffer, image, { quoted: Lan, caption: '_Dah Jadi Nih..._' })
						fs.unlinkSync(ran)
					})
					break

                case 'tomp4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !Lan.message.videoMessage || isQuotedSticker) && args.length == 0) {
                        ger = isQuotedSticker ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
                        owgi = await gen.downloadAndSaveMediaMessage(ger)
                        data = await imgbb(`${keybb}`, owgi)
                        axios.get(`https://ezgif.com/webp-to-mp4?url=${data.display_url}`)
                            .then(({ data }) => {
                                $ = cheerio.load(data)
                                bodyFormThen = new FormData()
                                file = $('input[name="file"]').attr('value')
                                token = $('input[name="token"]').attr('value')
                                convert = $('input[name="file"]').attr('value')
                                gotdata = {
                                    file: file,
                                    token: token,
                                    convert: convert
                                }
                                bodyFormThen.append('file', gotdata.file)
                                bodyFormThen.append('token', gotdata.token)
                                bodyFormThen.append('convert', gotdata.convert)
                                axios({
                                    method: 'post',
                                    url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                                    data: bodyFormThen,
                                    headers: {
                                        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                                    }
                                }).then(({ data }) => {
                                    $ = cheerio.load(data)
                                    result = 'https:' + $('div#output > p.outfile > video > source').attr('R4ML4N')
                                    getBuffer(result).then(tog => {
                                        gen.sendMessage(from, tog, video, { mimetype: 'video/mp4', quoted: Lan })
                                    })
                                })
                            })
                    } else {
                        reply('Reply StickerGif nya!')
                    }
                    break
                    
				case 'imgtourl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					costum('[WAIT] Sabar Kak', text, tescuk, cr)
					var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
					var media = await gen.downloadAndSaveMediaMessage(encmedia)
					var imgbb = require('imgbb-uploader')
					imgbb(`${keybb}`, media)
						.then(data => {
							var caps = `「 *IMAGE TO URL* 」
➸ ID : ${data.id}
➸ MimeType : ${data.image.mime}
➸ Extension : ${data.image.extension}
➸ URL : ${data.display_url}`
							ibb = fs.readFileSync(media)
							gen.sendMessage(from, ibb, image, { quoted: Lan, caption: caps })
						})
						.catch(err => {
							throw err
						})
					break
/*            case 'imgtourl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					costum('[WAIT] Sabar Kak', text, tescuk, cr)
					var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
					var media = await gen.downloadAndSaveMediaMessage(encmedia)
                    const linkImg = await uploadImages(media, `${sender}_img`)
                    reply(linkImg)
            break*/
				case 'komenyt':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					gh = body.slice(9)
					usnm = gh.split("&")[0];
					cmn = gh.split("&")[1];
					var imgbb = require('imgbb-uploader')
					try {
						pp = await gen.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
						pp = 'https://i.ibb.co/zJ6dsYX/thumbnail.jpg'
					}
					media = await getBuffer(pp)
					datae = await imageToBase64(JSON.stringify(pp).replace(/\"/gi, ''))
					fs.writeFileSync('getpp.jpeg', datae, 'base64')
					res = await imgbb(`${keybb}`, 'getpp.jpeg')
					buffer = await getBuffer(`https://some-random-api.ml/canvas/youtube-comment?avatar=${res.display_url}&comment=${cmn}&username=${usnm}`)
					gen.sendMessage(from, buffer, image, { caption: 'Nih Cok', contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_YOUTUBE COMMENT_*' } } })
					break

				case 'trigered':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await gen.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						ranp = getRandom('.gif')
						rano = getRandom('.webp')
						anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${trig}`
						exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
							fs.unlinkSync(ranp)
							if (err) return reply('GAGAL UM')
							nobg = fs.readFileSync(rano)
							gen.sendMessage(from, nobg, sticker, { quoted: Lan })
							fs.unlinkSync(rano)
						})
					} else {
						reply('Gunakan Foto Kakm')
					}
					break
			    case 'nightcore':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())			    
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					gen.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'slow':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					gen.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'tupai':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					gen.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'blub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.9,asetrate=95100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					gen.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'gemuk':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					gen.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'ghost':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=3486" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						ghs = fs.readFileSync(ran)
					gen.sendMessage(from, ghs, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
		       case 'bass':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())		   
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=64:width_type=o:width=2:g=56 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					gen.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					   })
				       break
	             case 'toptt':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal mengkonversi audio ke ptt')
						topt = fs.readFileSync(ran)
					gen.sendMessage(from, topt, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						})
						await limitAdd(sender)
					    break
				
				case 'mutual':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (isGroup) return reply('Maaf Kak Tidak Bisa Di Group')
					anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net', '')
					await reply('Mencari Pasangan >_<')
					await reply(`wa.me/${anug}`)
					await reply(`Pasangan Ditemukan :\n*${prefix}next* — Temukan Pasangan Baru`)
					break

				case 'next':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (isGroup) return reply('Maaf Kak Tidak Bisa Di Group')
					anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net', '')
					await reply('Mencari Pasangan >_<')
					await reply(`wa.me/${anug}`)
					await reply(`Pasangan Ditemukan :\n*${prefix}next* — Temukan Pasangan Baru`)
					break
					
				
					case 'artimimpi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Masukan nama!\nContoh :\n${prefix}artimimpi ular`)
					anu = await fetchJsom(`https://api.zeks.xyz/api/artimimpi?apikey=${zeksapi}&q=${body.slice(11)}`)
					mimpi = anu.result
					apasi = `「 *ARTI MIMPI* 」\n\n<${mimpi.string}`
					reply(apasi)
					break
					case 'artinama':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Masukan nama!\nContoh :\n${prefix}artinama Ramlan`)
					anu = await fetchJsom(`https://api.zeks.xyz/api/artinama?apikey=${zeksapi}&nama=${body.slice(10)}`)
					apasii = `「 *ARTI NAMA* 」\n\n${anu.result}`
					reply(apasii)
					break
					case 'artijodoh':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(11)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (!q) return reply(`Masukan nama!\nContoh :\n${prefix}artijodoh Ramlan & Rara`)
					anu = await fetchJsom(`https://api.zeks.xyz/api/primbonjodoh?apikey=${zeksapi}&nama1=${teks1}&nama2=${teks2}`)
					jodoh = anu.result
					apasiii = `「 *ARTI JODOH* 」\n\nKecocokan pasangan!\nNama kamu : ${jodoh.nama1}\nPasangan kamu : ${jodoh.nama2}\n\nPOSITIF : ${jodoh.positif}\nNEGATIF : ${jodoh.negatif}`
					zbuf = await getBuffer(jodoh.thumb)
					gen.sendMessage(from, zbuf, image, {quoted: Lan, caption: apasiii})
					break
				case 'ytstalk':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					gatauda = body.slice(9)
					anu = await fetchJson(`https://api.zeks.xyz/api/ytchannel?apikey=${zeksapi}&q=${body.slice(9)}`)
					reply(nad.wait())
					yts = `「 *YT STALKING* 」
➸ Nama Channel : ${anu.result[0].title}
➸ ID Channel : ${anu.result[0].id}
➸ Subscriber : ${anu.result[0].subscriber_count}
➸ Bio Channel : ${anu.result[0].description}
➸ Total Video : ${anu.result[0].video_count}`
					ytst = await getBuffer(anu.result[0].thumbnail)
					gen.sendMessage(from, ytst, image, { quoted: Lan, caption: yts })
					break
case 'googleimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (!q) return reply(`Format salah!\nContoh :\n${prefix}googleimage hacker`)
reply(nad.wait())
teks = args.join(' ')
res = await googleImage(teks, google)
function google(error, result){
if (error){ return reply('Gambar tidak ditemukan')}
else {
var gugIm = result
var gugeli =  gugIm[Math.floor(Math.random() * gugIm.length)].url
gen.sendMessage(from, gugeli, image, {quoted: Lan})
}
}
break
               case 'stalkgh': 
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					anu = await fetchJson(`https://x-restapi.herokuapp.com/api/github-stalk?username=${q}&apikey=BETA`)
					reply(nad.wait())
					ghc = `「 *GITHUB STALKING* 」
➸ Username : ${anu.username}
➸ ID : ${anu.result.id}
➸ Followers : ${anu.follower}
➸ Following : ${anu.following}
➸ Repo : ${anu.countrepo}
➸ Deskripsi : ${anu.bio}`
					ghg = await getBuffer(anu.avatar)
					gen.sendMessage(from, ghg, image, {quoted: Lan, caption: ghc})
					break
				case 'brainly':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}brainly apa itu penis`)
					await limitAdd(sender)
					brien = body.slice(9)
					brainly(`${brien}`).then(res => {
						teks = '♡───────────♡\n'
						for (let Y of res.data) {
							teks += `\n*「 BRAINLY 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n♡───────────♡\n`
						}
						gen.sendMessage(from, teks, text, { quoted: Lan, detectLinks: false })
						console.log(res)
					})
					break
					
				case 'brain':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}brainly apa itu penis`)
					await limitAdd(sender)
					brien = body.slice(7)
					anu = await fetchJson(`https://api.zeks.xyz/api/brainly?apikey=${zeksapi}&q=${brien}&count=10`)
						teks = '♡───────────♡\n'
						for (let Y of anu.data) {
							teks += `\n*「 BRAINLY 」*\n\n*➸ Pertanyaan:* ${Y.question}\n\n*➸ Jawaban:* ${Y.answer[0].text}\n♡───────────♡\n`
						}
						gen.sendMessage(from, teks, text, { quoted: Lan, detectLinks: false })
					break

				case 'wiki':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}wiki online`)
					var bby = body.slice(6)
					anu = await fetchJson(`https://api.zeks.xyz/api/wiki?apikey=${zeksapi}&q=${body.slice(6)}`)
					reply('[WAIT] Sedang Searching...')
					wikiped = `「 WIKI PEDIA 」\n Jawaban : ${anu.result.result}`
					gen.sendMessage(from, wikiped, text, { quoted: Lan })
					break

				case 'kbbi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}kbbi manusia`)
					var bby = body.slice(6)
					anu = await fetchJson(`https://api.zeks.xyz/api/kbbi?apikey=${zeksapi}&q=${body.slice(6)}`)
					reply('[WAIT] Sedang Searching...')
					kabebei = `「 *KBBI* 」\nJawaban : ${anu.result}`
					gen.sendMessage(from, kabebei, text, { quoted: Lan })
					break
				case 'kodpos':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}kodpos Jakarta`)
					var bby = body.slice(6)
					anu = await fetchJson(`https://killernetsukotatsumaki-api.herokuapp.com/api/info/kodepos?kota=${body.slice(6)}&apikey=mariogans`)
					reply('[WAIT] Sedang Searching...')
                    kodpos = ` Kode Pos`
                    for (let i of anu.result) {
					kodpos += `\nprovinsi : ${i.data.province}\nKota : ${i.data.city}\nKelurahan : ${i.data.subdistrict}\nTempat : ${i.data.urban}\nkodpos : ${i.data.postalcode}`
				    }
                    gen.sendMessage(from, kodpos, text, { quoted: Lan })
                    break
				case 'pinterest':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					gen.updatePresence(from, Presence.composing)
					data = await fetchJson(`https://api.zeks.xyz/api/pinimg?apikey=${zeksapi}&q=${q}`, { method: 'get' })
					ahu = data.data
					reply(nad.wait())
					n = JSON.parse(JSON.stringify(ahu));
					nimek = n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					gen.sendMessage(from, pok, image, { quoted: Lan, caption: `*PINTEREST*` })
					break
					case 'jadwalsholat':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Daerah Nya Mana?\nContoh :\n${prefix}jadwalsholat Tasikmalaya`)
					anu = await fetchJson(`https://api.zeks.xyz/api/jadwalsholat?apikey=${zeksapi}&daerah=${q}`)
					jsholat = `${anu.data.string}`
					gen.sendMessage(from, jsholat, text, {quoted: Lan})
					break

				
				case 'addstiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedSticker) return reply('Reply stickernya kak -_-')
					stiklan = body.slice(11)
					if (!stiklan) return reply('Namain Stickernya kak!')
					adds = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					lan = await gen.downloadMediaMessage(adds)
					setimker.push(`${stiklan}`)
					fs.writeFileSync(`./media/sticker/${stiklan}.webp`, lan)
					fs.writeFileSync(`./media/stik.json`, JSON.stringify(setimker))
					await reply('Sticker Berhasil Ditambahkan Ke Database Bot')
					break

				case 'getstiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Nama Stiker Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}liststiker`)
					stikeram = body.slice(11)
					hasilya = fs.readFileSync(`./media/sticker/${stikeram}.webp`)
					gen.sendMessage(from, hasilya, sticker, { quoted: Lan })
					break

				case 'liststiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lis = '╭──「 *LIST STICKER* 」\n'
					for (let cieee of setimker) {
						lis += `◯ ${cieee}\n`
					}
					lis += `\n╰─────「 *${setimker.length}* 」`
					gen.sendMessage(from, lis.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": setimker } })
					break

				case 'addvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedVideo) return reply('Reply Videonya Kak')
					adv = body.slice(10)
					if (!adv) return reply('Namain video nya kak')
					deo = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					dvi = await gen.downloadMediaMessage(deo)
					vidioya.push(`${adv}`)
					fs.writeFileSync(`./media/video/${adv}.mp4`, dvi)
					fs.writeFileSync(`./media/video.json`, JSON.stringify(vidioya))
					gen.sendMessage(from, `Video Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: Lan })
					break

				case 'getvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Nama Video Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listvideo`)
					getvi = body.slice(10)
					buffer = fs.readFileSync(`./media/video/${getvi}.mp4`)
					gen.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: Lan })
					break

				case 'listvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					list = '╭──「 *LIST VIDEO* 」\n'
					for (let nihh of vidioya) {
						list += `◯ ${nihh}\n`
					}
					list += `\n╰─────「 *${vidioya.length}* 」`
					gen.sendMessage(from, list.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": vidioya } })
					break

				case 'addvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedAudio) return reply('Reply Vn Nya Kak')
					advn = body.slice(7)
					if (!advn) return reply('Nama vn nya apa?')
					boij = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await gen.downloadMediaMessage(boij)
					audioya.push(`${advn}`)
					fs.writeFileSync(`./media/audio/${advn}.mp3`, delb)
					fs.writeFileSync('./media/audio.json', JSON.stringify(audioya))
					gen.sendMessage(from, `Vn Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: Lan })
					break

				case 'getvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Nama Vn Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listvn`)
					namastc = body.slice(7)
					buffer = fs.readFileSync(`./media/audio/${namastc}.mp3`)
					gen.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
					break

				case 'listvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lisv = '╭──「 *LIST VN* 」\n'
					for (let awokwkwk of audioya) {
						lisv += `◯ ${awokwkwk}\n`
					}
					lisv += `\n╰─────「 *${audioya.length}* 」`
					gen.sendMessage(from, lisv.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": audioya } })
					break

				case 'addimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					sepimg = body.slice(10)
					if (!sepimg) return reply('Nama Gambar Nya Apa?')
					svimeg = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					imej = await gen.downloadMediaMessage(svimeg)
					imegya.push(`${sepimg}`)
					fs.writeFileSync(`./media/image/${sepimg}.jpeg`, imej)
					fs.writeFileSync('./media/image.json', JSON.stringify(imegya))
					gen.sendMessage(from, `Gambar Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: Lan })
					break

				case 'getimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Nama Gambar Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listimage`)
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./media/image/${namastc}.jpeg`)
					gen.sendMessage(from, buffer, image, { quoted: Lan })
					break

				case 'listimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lisi = '╭──「 *LIST IMAGE* 」\n'
					for (let menghilih of imegya) {
						lisi += `◯ ${menghilih}\n`
					}
					lisi += `\n╰─────「 *${imegya.length}* 」`
					gen.sendMessage(from, lisi.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": imegya } })
					break
				case 'iri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					irim = fs.readFileSync('./media/dj/iri.mp3');
					gen.sendMessage(from, irim, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'pale':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					pal = fs.readFileSync('./media/dj/pale.mp3');
					gen.sendMessage(from, pal, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'pota':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					pot = fs.readFileSync('./media/dj/pota.mp3');
					gen.sendMessage(from, pot, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'welot':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					wel = fs.readFileSync('./media/dj/welot.mp3');
					gen.sendMessage(from, wel, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'alay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					ala = fs.readFileSync('./media/dj/alay.mp3');
					gen.sendMessage(from, ala, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'bernyanyi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					ber = fs.readFileSync('./media/dj/bernyanyi.mp3');
					gen.sendMessage(from, ber, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'bwa':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					bw = fs.readFileSync('./media/dj/bwa.mp3');
					gen.sendMessage(from, bw, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'ganteng':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					gan = fs.readFileSync('./media/dj/ganteng.mp3');
					gen.sendMessage(from, gan, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'gatal':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					ga = fs.readFileSync('./media/dj/gatal.mp3');
					gen.sendMessage(from, ga, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'ladida':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lada = fs.readFileSync('./media/dj/ladadida.mp3');
					gen.sendMessage(from, lada, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'rusher':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					rus = fs.readFileSync('./media/dj/rusher.mp3');
					gen.sendMessage(from, rus, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'boong':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					boo = fs.readFileSync('./media/dj/tb.mp3');
					gen.sendMessage(from, boo, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'tengteng':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					teng = fs.readFileSync('./media/dj/tengteng.mp3');
					gen.sendMessage(from, teng, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound1':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					satu = fs.readFileSync('./media/music/sound1.mp3');
					gen.sendMessage(from, satu, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					dua = fs.readFileSync('./media/music/sound2.mp3');
					gen.sendMessage(from, dua, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					tiga = fs.readFileSync('./media/music/sound3.mp3');
					gen.sendMessage(from, tiga, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					empat = fs.readFileSync('./media/music/sound4.mp3');
					gen.sendMessage(from, empat, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound5':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lima = fs.readFileSync('./media/music/sound5.mp3');
					gen.sendMessage(from, lima, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound6':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					enam = fs.readFileSync('./media/music/sound6.mp3');
					gen.sendMessage(from, enam, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound7':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					tujuh = fs.readFileSync('./media/music/sound7.mp3');
					gen.sendMessage(from, tujuh, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break
				
                case 'join':
                if (!isOwner) return reply(nad.ownerb())
                if (args.length < 1) return reply(`Kirim perintah *${prefix}join* link grup`)
                if (!isUrl(args[0]) && !args[0].includes('chat.whatsapp.com')) return reply('Link tidak valid')
					setTimeout( () => {
					gen.query({json:["action", "invite", `${args[0].replace('https://chat.whatsapp.com/','')}`]})
					suksez = `Done!`
					gen.sendMessage(from, suksez, text,{quoted : Lan, contextInfo: { forwardingScore: 100, isForwarded: true}})
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					reply('Bentar Boss')
					}, 0) // 1000 = 1s,
					break					
                case 'colong': // TAKE STICKER
					if (!isOwner) return reply(nad.ownerb())
                    var namaPackss = `${autor}`
                    var authorPackss = `${peknem}`
                    stiker_wm = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    dlstiker_wm = await gen.downloadAndSaveMediaMessage(stiker_wm)
                    stickerpackid = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2" //not sure what this does
                    packname = namaPackss;
                    author = authorPackss;
                    exif321 = getRandom('.exif')
                    exifst = getRandom('.webp')
                    googlelink = `https://wa.me/6289523258649?text=${prefix}menu`;
                    applelink = `https://wa.me/6289523258649?text=${prefix}menu`;


                    json = { "sticker-pack-id": stickerpackid, "sticker-pack-name": packname, "sticker-pack-publisher": author, "android-app-store-link": googlelink, "ios-app-store-link": applelink }
                    len = JSON.stringify(json).length

                    f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
                    aaa = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
                    if (len > 256) {
                        len = len - 256
                        aaa.unshift(0x01)
                    } else {
                        aaa.unshift(0x00)
                    }
                    fff = Buffer.from(aaa)
                    ffff = Buffer.from(JSON.stringify(json))

                    if (len < 16) {
                        len = len.toString(16)
                        len = "0" + len
                    } else {
                        len = len.toString(16)
                    }
                    ff = Buffer.from(len, "hex")

                    wm = Buffer.concat([f, ff, fff, ffff])

                    fs.writeFile(exif321, wm, function (err) {
                        if (err) return console.log(err);
                        exec(`webpmux -set exif ${exif321} undefined.webp -o ${exifst}`, (err) => {
                            if (err) return console.log(err);
                            gen.sendMessage(from, fs.readFileSync(exifst), sticker, { quoted: Lan })
                            fs.unlinkSync(exifst)
                            fs.unlinkSync(exif321)
                            fs.unlinkSync('undefined.webp')
                        })
                    });
                    break
                case 'take': // TAKE STICKER
                if (!isPrem) return reply(nad.premium(prefix))

                    var namaPackss = q.substring(0, q.indexOf('|') - 1)
                    var authorPackss = q.substring(q.lastIndexOf('|') + 2)
                    stiker_wm = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    dlstiker_wm = await gen.downloadAndSaveMediaMessage(stiker_wm)
                    stickerpackid = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2" //not sure what this does
                    packname = namaPackss;
                    author = authorPackss;
                    exif321 = getRandom('.exif')
                    exifst = getRandom('.webp')
                    googlelink = `https://wa.me/6285559240360?text=${prefix}menu`;
                    applelink = `https://wa.me/6285559240360?text=${prefix}menu`;


                    json = { "sticker-pack-id": stickerpackid, "sticker-pack-name": packname, "sticker-pack-publisher": author, "android-app-store-link": googlelink, "ios-app-store-link": applelink }
                    len = JSON.stringify(json).length

                    f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
                    aaa = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
                    if (len > 256) {
                        len = len - 256
                        aaa.unshift(0x01)
                    } else {
                        aaa.unshift(0x00)
                    }
                    fff = Buffer.from(aaa)
                    ffff = Buffer.from(JSON.stringify(json))

                    if (len < 16) {
                        len = len.toString(16)
                        len = "0" + len
                    } else {
                        len = len.toString(16)
                    }
                    ff = Buffer.from(len, "hex")

                    wm = Buffer.concat([f, ff, fff, ffff])

                    fs.writeFile(exif321, wm, function (err) {
                        if (err) return console.log(err);
                        exec(`webpmux -set exif ${exif321} undefined.webp -o ${exifst}`, (err) => {
                            if (err) return console.log(err);
                            gen.sendMessage(from, fs.readFileSync(exifst), sticker, { quoted: Lan })
                            fs.unlinkSync(exifst)
                            fs.unlinkSync(exif321)
                            fs.unlinkSync('undefined.webp')
                        })
                    });
                    break
                case 'setexif':
					if (!isOwner) return reply(nad.ownerb())
                    const namaPack = q.substring(0, q.indexOf('|') - 1)
                    const authorPack = q.substring(q.lastIndexOf('|') + 2)
                    fs.unlinkSync('./sticker/data.exif')
                    sleep(2000)
                    addMetadata(namaPack, authorPack)
                    fakestatus(`Success ubah wm sticker`)
                    break
                        case 'y':
                        if (!isOwner) return reply(nad.ownerb())
                            var value = args.join(" ")
                            var options = {
                                text: value,
                                contextInfo: {
                                    participant: '0@s.whatsapp.net',
                                    remoteJid: 'status@broadcast',
                                    isForwarded: true,
                                    forwardingScore: 300,
                                    quotedMessage: {
                                        documentMessage: {
                                            fileName: cr,
                                            jpegThumbnail: fs.readFileSync('./src/image/thumbnail.jpeg'),
                                            mimetype: 'application/pdf',
                                            pageCount: 200
                                        }
                                    }
                                }
                            }
                            gen.sendMessage(from, options, text)
                            break			
                case 'setthumb':
                if (!isOwner) return reply(nad.ownerb())
                    if (!isQuotedImage) return reply('Reply imagenya blokk!')
                    const messimagethumb = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    const downiamgethumb = await gen.downloadMediaMessage(messimagethumb)
                    fs.unlinkSync(`./src/image/thumbnail.jpeg`)
                    await sleep(2000)
                    fs.writeFileSync(`./src/image/thumbnail.jpeg`, downiamgethumb)
                    reply('Succes')
                    break
				case 'setppbot':
				gen.updatePresence(from, Presence.composing)
				if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					if (!isOwner) return reply(nad.ownerb())
					enmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await gen.downloadAndSaveMediaMessage(enmedia)
					await gen.updateProfilePicture(botNumber, media)
					reply('Makasih profil barunya😗')
					break
                 case 'readall':
					if (!isOwner) return reply(nad.ownerb())
					var chats = await gen.chats.all()
                    chats.map( async ({ jid }) => {
                          await gen.chatRead(jid)
                    })
					rdl = `${a}Berhasil membaca ${chats.length} Chat !${a}`
					await gen.sendMessage(from, rdl, MessageType.text, {quoted: Lan})
					console.log(chats.length)
					break
				case 'addprem':
					if (!isOwner) return reply(nad.ownerb())
					adprem = `${args[0].replace('@', '')}@s.whatsapp.net`
					premium.push(adprem)
					fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
					fakestatus(`BERHASIL MENAMBAHKAN USER PREMIUM`)
					break

				case 'dellprem':
					if (!isOwner) return reply(nad.ownerb())
					delprem = `${args[0].replace('@', '')}@s.whatsapp.net`
					delp = ban.indexOf(delprem)
					premium.splice(delp, 1)
					fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
					fakestatus(`BERHASIL MENGHAPUS USER PREMIUM`)
					break
					
                case 'premiumlist':
				gen.updatePresence(from, Presence.composing) 
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
				pemlist = '╭──「 *USER PREMIUM* 」\n'
				for (let premm of premium) {
					pemlist += `> @${premm.split('@')[0]}\n`
					}
					pemlist += `Total : ${premium.length}`
				gen.sendMessage(from, pemlist.trim(), extendedText, {quoted: Lan, contextInfo: {"mentionedJid": premium}})
				break
				
				case 'ban':
					if (!isOwner) return reply(nad.ownerb())
					bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
					ban.push(bnnd)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					fakestatus(`Nomor ${bnnd} telah dibanned!`)
					break

				case 'unban':
					if (!isOwner) return reply(nad.ownerb())
					ya = `${args[0].replace('@', '')}@s.whatsapp.net`
					unb = ban.indexOf(ya)
					ban.splice(unb, 1)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					fakestatus(`Nomor ${ya} telah di unban!`)
					break
                   case 'addbadword':
					if (!isOwner) return reply(nad.ownerb())
                    if (args.length < 1) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
                    const bw = body.slice(12)
                    bad.push(bw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menambahkan BAD WORD!')
                    break
                case 'delbadword':
					if (!isOwner) return reply(nad.ownerb())
                    if (args.length < 1) return reply( `Kirim perintah ${prefix}delbadword [kata kasar]. contoh ${prefix}delbadword bego`)
                    let dbw = body.slice(12)
                    bad.splice(dbw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menghapus BAD WORD!')
                    break 
                case 'listbadword':
                case 'badwordlist':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
                    for (let i of bad) {
                        lbw += `➢ ${i.replace(bad)}\n`
                    }
                    await reply(lbw)
                    break
				case 'bc':
					gen.updatePresence(from, Presence.composing)
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply('.......')
					anu = await gen.chats.all()
					if (isMedia && !Lan.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						buff = await gen.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							gen.sendMessage(_.jid, buff, image, { caption: `*「 ${botName} BROADCAST 」*\n\n${body.slice(4)}` })
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 ${botName} BROADCAST 」*\n\n${body.slice(4)}`)
						}
						reply('*「 SUKSES BOSKU 」*')
					}
					break

				case 'setreply':
					if (!isOwner) return reply(nad.ownerb())
					gen.updatePresence(from, Presence.composing)
					if (args.length < 1) return
					cr = body.slice(10)
					fakestatus(`reply berhasil di ubah menjadi : ${cr}`)
					await limitAdd(sender)
					break					
					
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(nad.ownerb())
					prefix = args[0]
					fakestatus(`*「 SUKSES 」* Prefix jadi ➸ : ${prefix}`)
					break

				case 'setbio':
					if (!isOwner) return reply(nad.ownerb())
					iyek = body.slice(8)
					gen.setStatus(`${iyek}`)
					fakestatus(`Status BOT berhasil diperbarui menjadi :\n*[ ${iyek} ]*`)
					break
					
				case 'clearall':
					if (!isOwner) return reply(nad.ownerb())
					anu = await gen.chats.all()
					gen.setMaxListeners(25)
					for (let _ of anu) {
						gen.deleteChat(_.jid)
					}
					fakestatus(nad.clears())
					break

				case 'event':
					if (isBanned) return reply(nad.baned())
					if (!isGroup) return reply(nad.groupo())
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply('Ekhemm >_<')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*FITUR EVENT SUDAH AKTIF BOS*')
						event.push(from)
						fs.writeFileSync('./database/event.json', JSON.stringify(event))
						reply('*「 SUKSES 」MENGAKTIFKAN EVENT DI GROUP*')
					} else if (Number(args[0]) === 0) {
						event.splice(from, 1)
						fs.writeFileSync('./database/event.json', JSON.stringify(event))
						reply('*「 SUKSES 」MEMATIKAN EVENT DI GROUP*')
					} else {
						reply('pilih 1/0')
					}
					break

				case 'term':
					if (!isOwner) return reply(nad.ownerB())
					const cmd = body.slice(6)
					var itsme = `0@s.whatsapp.net`
					var split = `EXECUTOR`
					const term = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
					exec(cmd, (err, stdout) => {
						if (err) return gen.sendMessage(from, `root@Ramlan:~ ${err}`, text, { quoted: Lan })
						if (stdout) {
							gen.sendMessage(from, stdout, text, term)
						}
					})
					break

                case 'return':
				    if (!isOwner) return reply(nad.ownerB())
					return gen.sendMessage(from, JSON.stringify(eval(args.join(''))), text, { quoted: Lan })
					break
				default:
					if (budy == '@cognita') {
						if (isBanned) return reply(nad.baned())
						if (isRegistered) return reply(nad.rediregis())
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
					ppaddd = await gen.getProfilePicture(sender)
					} catch {
					ppaddd = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
							captnya = `◪ ➪  *「 DAFTAR USER 」*
➪ *Nama: ${pushname}*
➪ *No: ${sender.split("@")[0]}*
➪ *Chat: wa.me/${sender.split("@")[0]}*
➪ *User Verified : ${_registered.length}*
➪ *SN: ${serialUser}*
➪ *Waktu : ${time}*
◪ ➪  *「 GEN BOT 」*`
							let peripi = await getBuffer(`http://hadi-api.herokuapp.com/api/card/verify?nama=${encodeURI(pushname)}&member=${_registered.length}&seri=${serialUser}&pp=${ppaddd}&bg=https://i.ibb.co/yPK6hrL/images-15.jpg`)
							gen.sendMessage(from, peripi, image, {
							caption: captnya, quoted: Lan})
							addATM(sender)
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
					ppaddd = await gen.getProfilePicture(sender)
					} catch {
					ppaddd = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
							captnya = `◪ ➪  *「 DAFTAR USER 」*
➪ *Nama: ${pushname}*
➪ *No: ${sender.split("@")[0]}*
➪ *Chat: wa.me/${sender.split("@")[0]}*
➪ *User Verified : ${_registered.length}*
➪ *SN: ${serialUser}*
➪ *Waktu : ${time}*
◪ ➪  *「 GEN BOT 」*`
							let peripi = await getBuffer(`http://hadi-api.herokuapp.com/api/card/verify?nama=${encodeURI(pushname)}&member=${_registered.length}&seri=${serialUser}&pp=${ppaddd}&bg=https://i.ibb.co/RYNsRjQ/579dede8ce6b.jpg`)
							gen.sendMessage(from, peripi, image, {
							caption: captnya, quoted: Lan})
						}
						addATM(sender)
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
					}
					}
			if (budy == 'cekprefix') {
				fakestatus(`*${botName} MENGGUNAKAN PREFIX :「 ${prefix} 」*`)
			}
			if (budy == '#genbotgc') {
				gen.sendMessage(from, `*GROUP GEN BOT OFFICIAL*
https://chat.whatsapp.com/DiGqOnT0jSB0vjYKwCBDO7
`, text, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan})
			}
			if (budy == 'Kick') {
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('Reply Chat Target Nya Kak')
					kicknya = Lan.message.extendedTextMessage.contextInfo.participant
					await gen.groupRemove(from, [kicknya])
					reply(`Hus Hus , Gausa Balik Lagi !!!`)
			}
		//GENMUSIC
if (budy == 'sultan') {
					sul = fs.readFileSync('./media/dj/djsultan.mp3');
					gen.sendMessage(from, sul, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'gta') {
					gta = fs.readFileSync('./media/dj/djgta.mp3');
					gen.sendMessage(from, gta, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'duakursi') {
					dkr = fs.readFileSync('./media/dj/duakursi.mp3');
					gen.sendMessage(from, dkr, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'papip') {
					pap = fs.readFileSync('./media/dj/papipip.mp3');
					gen.sendMessage(from, pap, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'nomix') {
					nom = fs.readFileSync('./media/dj/safonomix.mp3');
					gen.sendMessage(from, nom, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'sariroti') {
					rot = fs.readFileSync('./media/dj/sariroti.mp3');
					gen.sendMessage(from, rot, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'takeme') {
					tek = fs.readFileSync('./media/dj/takeme.mp3');
					gen.sendMessage(from, tek, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'Pale') {
					pal = fs.readFileSync('./media/dj/pale.mp3');
					gen.sendMessage(from, pal, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
				if (budy == 'Pota') {					
					pot = fs.readFileSync('./media/dj/pota.mp3');
					gen.sendMessage(from, pot, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Welot') {					
					wel = fs.readFileSync('./media/dj/welot.mp3');
					gen.sendMessage(from, wel, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Alay') {
					ala = fs.readFileSync('./media/dj/alay.mp3');
					gen.sendMessage(from, ala, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}              			
				if (budy == 'Bwa') {				
					bwa = fs.readFileSync('./media/dj/bwa.mp3');
					gen.sendMessage(from, bwa, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			    }
				if (budy == 'Ganteng') {
					gan = fs.readFileSync('./media/dj/ganteng.mp3');
					gen.sendMessage(from, gan, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Gatal') {					
					ga = fs.readFileSync('./media/dj/gatal.mp3');
					gen.sendMessage(from, ga, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Ladida') {				
					lada = fs.readFileSync('./media/dj/ladadida.mp3');
					gen.sendMessage(from, lada, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
                if (budy == 'Sholawat') {
					shol = fs.readFileSync('./media/dj/sholawat.mp3');
					gen.sendMessage(from, shol, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
                if (budy == 'Manis') {
					manis = fs.readFileSync('./media/dj/manis.mp3');
					gen.sendMessage(from, manis, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Rusher') {
					rus = fs.readFileSync('./media/dj/rusher.mp3');
					gen.sendMessage(from, rus, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Boong') {
					boo = fs.readFileSync('./media/dj/tb.mp3');
					gen.sendMessage(from, boo, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Tengteng') {
					teng = fs.readFileSync('./media/dj/tengteng.mp3');
					gen.sendMessage(from, teng, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Gratata') {
					grata = fs.readFileSync('./media/dj/djgratata.mp3');
					gen.sendMessage(from, grata, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Bermain') {
					main = fs.readFileSync('./media/dj/djbermain.mp3');
					gen.sendMessage(from, main, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Kaweni') {
					wenik = fs.readFileSync('./media/dj/djkaweni.mp3');
					gen.sendMessage(from, wenik, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Old') {
					oledd = fs.readFileSync('./media/dj/djold.mp3');
					gen.sendMessage(from, oledd, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Sakit') {
					sakit = fs.readFileSync('./media/dj/djsakit.mp3');
					gen.sendMessage(from, sakit, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Zombie') {
					zmbie = fs.readFileSync('./media/dj/djzombie.mp3');
					gen.sendMessage(from, zmbie, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'leriler') {
					xb = fs.readFileSync('./media/dj/leriler.mp3');
					gen.sendMessage(from, xb, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
if (budy == 'gemes') {
					gms = fs.readFileSync('./media/dj/gemes.mp3');
					gen.sendMessage(from, gms, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
if (budy == 'mati') {
				mat = fs.readFileSync('./media/dj/mati.mp3');
					gen.sendMessage(from, mat, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
			if (budy == 'iri') {
			        irim = fs.readFileSync('./media/dj/iri.mp3');
					gen.sendMessage(from, irim, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'ara') {
			        irim = fs.readFileSync('./media/dj/ara.mp3');
					gen.sendMessage(from, irim, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'yamete') {
			        irim = fs.readFileSync('./media/audio/yamete.mp3');
					gen.sendMessage(from, irim, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'Yamete') {
			        irim = fs.readFileSync('./media/audio/yamete.mp3');
					gen.sendMessage(from, irim, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'Onichan') {
			        irim = fs.readFileSync('./media/audio/kawai.mp3');
					gen.sendMessage(from, irim, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'onichan') {
			        irim = fs.readFileSync('./media/audio/kawai.mp3');
					gen.sendMessage(from, irim, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'Ara') {
			        irim = fs.readFileSync('./media/dj/ara.mp3');
					gen.sendMessage(from, irim, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'bernyanyi') {
				    ber = fs.readFileSync('./media/dj/bernyanyi.mp3');
			        gen.sendMessage(from, ber, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'pale') {
					pal = fs.readFileSync('./media/dj/pale.mp3');
					gen.sendMessage(from, pal, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
				if (budy == 'pota') {					
					pot = fs.readFileSync('./media/dj/pota.mp3');
					gen.sendMessage(from, pot, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'welot') {					
					wel = fs.readFileSync('./media/dj/welot.mp3');
					gen.sendMessage(from, wel, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'alay') {
					ala = fs.readFileSync('./media/dj/alay.mp3');
					gen.sendMessage(from, ala, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}              			
				if (budy == 'bwa') {				
					bwa = fs.readFileSync('./media/dj/bwa.mp3');
					gen.sendMessage(from, bwa, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			    }
				if (budy == 'ganteng') {
					gan = fs.readFileSync('./media/dj/ganteng.mp3');
					gen.sendMessage(from, gan, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'gatal') {					
					ga = fs.readFileSync('./media/dj/gatal.mp3');
					gen.sendMessage(from, ga, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'ladida') {				
					lada = fs.readFileSync('./media/dj/ladadida.mp3');
					gen.sendMessage(from, lada, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
                if (budy == 'sholawat') {
					shol = fs.readFileSync('./media/dj/sholawat.mp3');
					gen.sendMessage(from, shol, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
                if (budy == 'manis') {
					manis = fs.readFileSync('./media/dj/manis.mp3');
					gen.sendMessage(from, manis, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'rusher') {
					rus = fs.readFileSync('./media/dj/rusher.mp3');
					gen.sendMessage(from, rus, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'boong') {
					boo = fs.readFileSync('./media/dj/tb.mp3');
					gen.sendMessage(from, boo, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'tengteng') {
					teng = fs.readFileSync('./media/dj/tengteng.mp3');
					gen.sendMessage(from, teng, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'gratata') {
					grata = fs.readFileSync('./media/dj/djgratata.mp3');
					gen.sendMessage(from, grata, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'bermain') {
					main = fs.readFileSync('./media/dj/djbermain.mp3');
					gen.sendMessage(from, main, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'kaweni') {
					wenik = fs.readFileSync('./media/dj/djkaweni.mp3');
					gen.sendMessage(from, wenik, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'old') {
					oledd = fs.readFileSync('./media/dj/djold.mp3');
					gen.sendMessage(from, oledd, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'sakit') {
					sakit = fs.readFileSync('./media/dj/djsakit.mp3');
					gen.sendMessage(from, sakit, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'zombie') {
					zmbie = fs.readFileSync('./media/dj/djzombie.mp3');
					gen.sendMessage(from, zmbie, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
				}
				if (budy == 'Iri') {
			        irim = fs.readFileSync('./media/dj/iri.mp3');
					gen.sendMessage(from, irim, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'Bernyanyi') {
				    ber = fs.readFileSync('./media/dj/bernyanyi.mp3');
			        gen.sendMessage(from, ber, MessageType.audio, {contextInfo: {isForwarded: true, forwardingScore: 300}, quoted: Lan, mimetype: 'audio/mp4', ptt: true })
			}
			if (budy == 'P') {
				reply(`Ya, Ada Yang Bisa Saya Bantu? Kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			
			if (budy == 'assalamualaikum') {
				reply(`Waalaikumsalam, Ada Yang Bisa Saya Bantu? kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'Assalamualaikum') {
				reply(`Waalaikumsalam, Ada Yang Bisa Saya Bantu? kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'Terimakasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'terimakasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'makasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'Thanks') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'thanks') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'Tq') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'tq') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
				}
				
			if (isGroup && !isCmd && budy != undefined) {
				//console.log(budy)
				//		reply(gen.cmdnf(prefix, command))
			} else {
				//console.log(color('[404]', 'red'), 'Unregistered Command from', color(sender.split('@')[0]))
			}
		} catch (e) {
			//console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()