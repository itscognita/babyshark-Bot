exports.wait = () => {
	return`_Loading...._`
}

exports.succes = () => {
	return`_Sukses✓_`
}

exports.lvlon = () => {
	return`_Leveling Aktif✓_`
}

exports.lvloff = () => {
	return`_Leveling Mati._`
}

exports.lvlnul = () => {
	return`_Kamu Tidak Memiliki Level_`
}

exports.lvlnoon = () => {
	return`_Leveling Belum Di aktifkan Di grup ini_`
}

exports.noregis = () => {
	return`_Anda Belum Terdaftar Sebagai User Cognita Bot_\n_Daftar Dengan Cara_\n\n_Ketik : @cognita
_`
}

exports.baned = () => {
	return`_Maaf Anda di Telah diBanned_`
}

exports.premium = (prefix) => {
	return`Fitur ini khusus user premium!
Upgrade ke premium Rp 2.000.-
Jika minat hubungi owner!!

Ketik : ${prefix}owner`
}

exports.rediregis = () => {
	return`_*Anda Sudah Terdaftar Sebagai User Cognita BOT*_`
}

exports.stikga = () => {
	return`_「 GAGAL 」Coba reply/tag ulang kak_`
}

exports.linkga = () => {
	return`_maaf linknya tidak valid_`
}

exports.groupo = () => {
	return`_Fitur Ini Khsus Group_`
}

exports.ownerb = () => {
	return`_Fitur ini Khusus Owner_`
}

exports.ownerg = () => {
	return`_Fitur ini Khusus Owner_`
}

exports.admin = () => {
	return`_Fitur Ini Khusus Admin Group_`
}

exports.badmin = () => {
	return`_*Bot Harus Menjadi Admin!!!*_`
}

exports.bug = () => {
	return`Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi!!`
}

exports.wrongf = () => {
	return`Teks Tidak Terlihat`
}

exports.clears = () => {
	return`Clear All Sukses`
}

exports.levelup = (pushname, sender, getLevelingXp,  getLevel, getLevelingLevel) => {
	return`
*「 SELAMAT 」*
➸ *Nama* : ${pushname}
➸ *Nomor* : wa.me/${sender.split("@")[0]}
➸ *Xp* : ${getLevelingXp(sender)}
➸ *Level* : ${getLevel} ➸ ${getLevelingLevel(sender)}
`}
 
exports.limitend = (pushname, prefix) => {
	return`*maaf ${pushname} limit hari ini habis*
*Silahkan Chat Owner Untuk Menambahkan limit*

\`\`\`Upgrade Premium Bebas Limit\`\`\`
\`\`\`➸ 2K : Permanen\`\`\`
\`\`\`Jika berminat silahkan hubungi owner\`\`\`
\`\`\`Kirim perintah : ${prefix}owner\`\`\`
`
}

exports.limitcount = (isPrem, limitCounts) => {
	return`
*「 LIMIT COUNT 」*
sisa limit anda : ${isPrem ? '*UNLIMITED*' : `${limitCounts}`}

Upgrade premium bosku,biar bebas gunain bot & Bisa memakai fitur khusus premium `
}

exports.uangkau = (pushname, sender, uangkau) => {
	return`*「 Cognita BANKING 」*
_*➣ NAMA : ${pushname}*_
_*➣ NOMOR : ${sender.split("@")[0]}*_
_*➣ UANG : ${uangkau}*_
`
}

exports.donasi = () => {
return`*DONASI KAK*
Pulsa : 087717710182
Gopay/Ovo/Dana : Chat Owner,Ketik *#owner* 

Donasi supaya bot terus update & Aktif`
}

exports.iklan = (botName, ownerNumbers, ownerName) => {
return`       [ 「 *IKLAN ${botName}* 」 ]
──────────────────────────────
◯ *DAFTAR SEWA & BUAT BOT :*
◯ *SEWA : 10K/GRUP (BULAN)*
◯ *BUAT : 80K (BISA JADI OWNER)*
◯ *PEMBAYARAN BISA MELALUI :*
◯ *GOPAY, PULSA+10K*
──────────────────────────────
◯ *KEUNTUNGAN SEWA BOT :*
◯ *1. BISA MEMASUKAN BOT KE GROUP*
◯ *2. BISA MENGGUNAKAN FITUR PREMIUM*
◯ *KEUNTUNGAN BUAT BOT :*
◯ *1. BISA MENJADI OWNER BOT SENDIRI*
◯ *2. BISA MENGGANTI NAMA BOT SENDIRI*
◯ *3. BISA MEMBAWA BOT KE GROUP*
◯ *4. BISA MENGGUNAKAN COMMAND OWNER*
◯ *5. BISA MENYEWAKAN BOT KEMBALI*
──────────────────────────────
◯ *JIKA MINAT IKLAN DIATAS*
◯ *HARAP HUBUNGI NOMOR DIBAWAH :*
◯ *wa.me/${ownerNumbers}*
──────────────────────────────
       [「 *POWERED BY ${ownerName}* 」]`
}