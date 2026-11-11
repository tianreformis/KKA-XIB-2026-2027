# Materi Git dan GitHub

Panduan lengkap untuk pemula: dari instalasi sampai kolaborasi tim.

---

## Daftar Isi

1. Pengenalan
2. Instalasi dan Konfigurasi Awal
3. Konsep Dasar
4. Alur Kerja Dasar
5. Melihat Riwayat dan Perbedaan
6. Membatalkan dan Mengembalikan
7. Branch dan Merge
8. Menyimpan Sementara (Stash)
9. File .gitignore
10. Remote: GitHub dan GitLab
11. Autentikasi: Token dan SSH
12. Kolaborasi: Fork, Pull Request, dan Konflik
13. Git di Komputer Lab Bersama
14. Kesalahan Umum dan Solusinya
15. Cheat Sheet
16. Latihan dan Kuis

---

## 1. Pengenalan

### Apa itu Git?

**Git** adalah sistem kontrol versi (*version control system*) yang mencatat setiap perubahan pada file proyek. Dengan Git, kita bisa:

- Kembali ke versi file sebelumnya.
- Melihat siapa mengubah apa dan kapan.
- Bekerja bersama tanpa saling menimpa pekerjaan.
- Mencoba fitur baru tanpa merusak kode utama.

Git berjalan **secara lokal** di komputer kita dan tidak membutuhkan internet.

### Apa itu GitHub?

**GitHub** adalah layanan *hosting* online untuk repositori Git. Git adalah alatnya, GitHub adalah tempat menyimpan dan berbagi hasilnya.

| | Git | GitHub |
|---|---|---|
| Jenis | Program di komputer | Layanan web |
| Fungsi | Mencatat versi | Menyimpan, berbagi, berkolaborasi |
| Internet | Tidak wajib | Wajib |
| Alternatif | - | GitLab, Bitbucket, Gitea, Forgejo |

### Istilah Penting

| Istilah | Arti |
|---|---|
| Repository (repo) | Folder proyek yang dilacak Git |
| Commit | Satu "foto" kondisi proyek pada suatu waktu |
| Branch | Cabang pengembangan terpisah |
| Remote | Repositori di server (GitHub/GitLab) |
| Clone | Menyalin repositori dari remote ke komputer |
| Push | Mengirim commit lokal ke remote |
| Pull | Mengambil dan menggabungkan perubahan dari remote |
| Merge | Menggabungkan dua branch |
| HEAD | Penunjuk posisi commit yang sedang aktif |

---

## 2. Instalasi dan Konfigurasi Awal

### Instalasi

- **Windows**: unduh dari https://git-scm.com lalu jalankan installer (pilihan bawaan sudah cukup).
- **macOS**: `brew install git` atau instal Xcode Command Line Tools.
- **Linux (Debian/Ubuntu)**: `sudo apt install git`

Cek hasilnya:

```bash
git --version
```

### Konfigurasi Identitas

Git mencatat nama dan email pada setiap commit.

```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@contoh.com"
```

Tanpa `--global`, pengaturan hanya berlaku di repositori saat ini:

```bash
git config user.name "Nama Anda"
git config user.email "email@contoh.com"
```

### Pengaturan Tambahan yang Berguna

```bash
git config --global init.defaultBranch main     # nama branch awal: main
git config --global core.editor "code --wait"   # VS Code sebagai editor
```

### Melihat dan Menghapus Konfigurasi

```bash
git config --list                    # semua pengaturan
git config --list --show-origin      # beserta file asalnya
git config user.name                 # satu nilai
git config --global --unset user.name   # hapus satu pengaturan
```

### Tingkat Konfigurasi

| Opsi | Cakupan | Lokasi |
|---|---|---|
| `--local` | Repositori ini (bawaan) | `.git/config` |
| `--global` | Semua repositori milik pengguna | `~/.gitconfig` |
| `--system` | Semua pengguna di komputer | file sistem Git |

Prioritas: **local mengalahkan global, global mengalahkan system**.

---

## 3. Konsep Dasar

### Tiga Area Kerja

```
Working Directory  --git add-->  Staging Area  --git commit-->  Repository
 (folder kerja)                   (antrean)                      (riwayat)
```

1. **Working Directory**: file yang sedang kita edit.
2. **Staging Area (Index)**: file yang sudah dipilih untuk masuk commit berikutnya.
3. **Repository**: riwayat commit yang tersimpan permanen di `.git`.

### Status File

| Status | Arti |
|---|---|
| Untracked | File baru, belum dilacak Git |
| Modified | File sudah dilacak dan berubah |
| Staged | File siap di-commit |
| Committed | Sudah tersimpan di riwayat |

---

## 4. Alur Kerja Dasar

### Membuat Repositori Baru

```bash
mkdir proyek-saya
cd proyek-saya
git init
```

Folder tersembunyi `.git` akan terbentuk. Jangan dihapus atau diubah manual.

### Mengecek Status

```bash
git status
```

Biasakan menjalankan perintah ini sesering mungkin.

### Menambahkan ke Staging

```bash
git add index.html        # satu file
git add index.html style.css   # beberapa file
git add .                 # semua perubahan di folder ini
git add *.html            # semua file HTML
```

### Membuat Commit

```bash
git commit -m "Tambah halaman utama"
```

Pintasan untuk file yang sudah dilacak (add + commit sekaligus):

```bash
git commit -am "Perbaiki warna tombol"
```

`-a` tidak menyertakan file baru (untracked).

### Tips Menulis Pesan Commit

- Singkat dan jelas, diawali kata kerja: "Tambah", "Perbaiki", "Hapus", "Ubah".
- Jelaskan **apa** yang berubah, bukan sekadar "update" atau "revisi".
- Buruk: `update`, `fix`, `asdf`
- Baik: `Perbaiki validasi form login`

### Mengubah Commit Terakhir

Salah pesan atau ada file tertinggal (hanya jika **belum di-push**):

```bash
git add file-tertinggal.txt
git commit --amend -m "Pesan yang benar"
```

### Menghapus dan Mengganti Nama File

```bash
git rm namafile.txt                 # hapus file dan catat penghapusannya
git rm --cached namafile.txt        # hapus dari Git saja, file tetap ada
git rm -r namafolder                # hapus folder
git mv nama-lama.txt nama-baru.txt  # ganti nama file
```

Setelah itu lakukan `git commit`.

---

## 5. Melihat Riwayat dan Perbedaan

### git log

```bash
git log                       # riwayat lengkap
git log --oneline             # satu baris per commit
git log --oneline -5          # 5 commit terakhir
git log --oneline --graph     # tampilan percabangan
git log --oneline --all --graph   # semua branch
git log --oneline -- file.txt     # riwayat satu file
git log --author="Nama"       # filter berdasarkan penulis
```

Tekan `q` untuk keluar dari tampilan log.

> Perhatikan: opsi memakai **dua tanda minus** (`--oneline`), bukan `oneline`.

### git diff

```bash
git diff                  # perubahan yang belum di-add
git diff --staged         # perubahan yang sudah di-add
git diff abc1234 def5678  # selisih dua commit
git diff --stat           # ringkasan jumlah baris berubah
```

### git show

```bash
git show abc1234          # detail satu commit
git show abc1234:file.txt # isi file pada commit tertentu
```

---

## 6. Membatalkan dan Mengembalikan

Bagian ini paling sering membingungkan. Pilih perintah berdasarkan **apa yang ingin dibatalkan**.

### 6.1 git restore (mengembalikan isi file)

```bash
git restore namafile.txt            # buang perubahan di folder kerja
git restore .                       # semua file
git restore --staged namafile.txt   # batalkan git add (unstage)
git restore --source=abc1234 namafile.txt   # ambil file dari commit lama
git restore --source=HEAD~1 namafile.txt    # dari satu commit sebelumnya
```

Mengembalikan file yang terhapus (selama pernah di-commit):

```bash
git restore namafile.txt
```

Memakai pola:

```bash
git restore --source=abc1234 -- '*.html'
```

> **Peringatan:** perubahan yang belum di-commit lalu dibuang dengan `restore` **tidak bisa dikembalikan**.

### 6.2 git reset (memundurkan commit)

| Perintah | Commit | Staging | File di folder kerja |
|---|---|---|---|
| `git reset --soft HEAD~1` | Dibatalkan | Tetap | Tetap |
| `git reset --mixed HEAD~1` (bawaan) | Dibatalkan | Dikosongkan | Tetap |
| `git reset --hard HEAD~1` | Dibatalkan | Dikosongkan | **Dibuang** |

```bash
git reset --soft HEAD~1      # batalkan commit, perubahan siap di-commit ulang
git reset --hard abc1234     # kembali total ke commit tertentu
```

`HEAD~1` = satu commit sebelumnya, `HEAD~2` = dua commit sebelumnya.

Kalau terlanjur `reset --hard`, cari commit yang hilang:

```bash
git reflog
git reset --hard <ID-dari-reflog>
```

### 6.3 git revert (membatalkan dengan commit baru)

```bash
git revert abc1234
```

Membuat commit baru yang membalikkan perubahan commit lama. **Aman untuk commit yang sudah di-push** karena riwayat tidak diubah.

### 6.4 Melihat Commit Lama (Detached HEAD)

```bash
git switch --detach abc1234     # atau: git checkout abc1234
```

Anda akan melihat pesan *detached HEAD*. Ini normal: Anda sedang "melihat" commit lama. Pilihan selanjutnya:

```bash
git switch -                    # kembali ke branch sebelumnya
git switch -c cabang-baru       # lanjut kerja dari commit ini
```

Jangan commit dalam kondisi detached HEAD tanpa membuat branch, karena commit tersebut mudah hilang.

### 6.5 Kapan Memakai yang Mana

| Situasi | Perintah |
|---|---|
| Salah edit file, mau balik ke versi terakhir | `git restore file` |
| Salah `git add` | `git restore --staged file` |
| File terhapus | `git restore file` |
| Salah pesan commit terakhir (belum push) | `git commit --amend` |
| Batalkan commit terakhir, belum push | `git reset --soft HEAD~1` |
| Batalkan commit yang sudah push | `git revert abc1234` |
| Ambil file lama dari commit tertentu | `git restore --source=ID file` |

### 6.6 checkout vs switch vs restore

`git checkout` punya terlalu banyak fungsi. Sejak Git 2.23 dipecah:

| Tujuan | Cara lama | Cara baru |
|---|---|---|
| Pindah branch | `git checkout main` | `git switch main` |
| Buat dan pindah branch | `git checkout -b fitur` | `git switch -c fitur` |
| Kembali ke branch sebelumnya | `git checkout -` | `git switch -` |
| Buang perubahan file | `git checkout -- file` | `git restore file` |

---

## 7. Branch dan Merge

### Konsep

Branch adalah jalur pengembangan terpisah. Branch utama biasanya bernama `main` (atau `master` pada repositori lama). Fitur baru dikerjakan di branch sendiri supaya `main` tetap stabil.

### Perintah Branch

```bash
git branch                  # daftar branch lokal
git branch -a               # termasuk branch remote
git branch fitur-login      # buat branch
git switch fitur-login      # pindah branch
git switch -c fitur-login   # buat dan pindah sekaligus
git branch -d fitur-login   # hapus branch (sudah di-merge)
git branch -D fitur-login   # hapus paksa
git branch -m nama-baru     # ganti nama branch saat ini
```

### Merge

Menggabungkan branch `fitur-login` ke `main`:

```bash
git switch main
git merge fitur-login
```

### Menyelesaikan Konflik Merge

Konflik terjadi saat dua branch mengubah baris yang sama. Git menandai file seperti ini:

```
<<<<<<< HEAD
<h1>Judul dari main</h1>
=======
<h1>Judul dari fitur-login</h1>
>>>>>>> fitur-login
```

Langkah menyelesaikan:

1. Buka file yang konflik (`git status` menunjukkan daftarnya).
2. Pilih isi yang benar, lalu **hapus** penanda `<<<<<<<`, `=======`, `>>>>>>>`.
3. Simpan file.
4. Jalankan:

```bash
git add namafile.html
git commit
```

Untuk membatalkan merge yang sedang berjalan:

```bash
git merge --abort
```

### Alur Kerja Branch yang Disarankan

```
main        o---o---------o---o
                 \       /
fitur-login       o--o--o
```

1. Buat branch dari `main`.
2. Kerjakan dan commit di branch itu.
3. Merge kembali ke `main` setelah selesai dan diuji.
4. Hapus branch yang sudah tidak dipakai.

---

## 8. Menyimpan Sementara (Stash)

Stash menyimpan perubahan yang belum di-commit tanpa membuat commit. Berguna saat harus pindah branch mendadak.

```bash
git stash                 # simpan perubahan
git stash -u              # termasuk file untracked
git stash list            # daftar simpanan
git stash pop             # kembalikan simpanan terbaru dan hapus dari daftar
git stash apply           # kembalikan tapi simpanan tetap ada
git stash drop            # hapus simpanan terbaru
```

Contoh alur:

```bash
git stash
git switch cabang-lain
# ...kerjakan sesuatu...
git switch cabang-semula
git stash pop
```

---

## 9. File .gitignore

File `.gitignore` berisi daftar file/folder yang **tidak** perlu dilacak Git, misalnya file rahasia, hasil kompilasi, dan dependensi.

Contoh `.gitignore`:

```
# Dependensi
node_modules/

# Variabel lingkungan dan rahasia
.env
*.key

# Hasil build
dist/
build/

# File sistem
.DS_Store
Thumbs.db

# Log
*.log
```

Aturan penting:

- `.gitignore` hanya berlaku untuk file yang **belum** dilacak.
- Jika file terlanjur dilacak: `git rm --cached namafile`, lalu commit.
- **Jangan pernah** commit file `.env`, password, token, atau kunci API. Kalau terlanjur ter-push, anggap rahasia itu bocor dan **ganti segera**.

Template siap pakai: https://github.com/github/gitignore

---

## 10. Remote: GitHub dan GitLab

### Membuat Akun dan Repositori

1. Daftar di https://github.com (atau https://gitlab.com).
2. Klik **New repository** (GitLab: **New project, Create blank project**).
3. Isi nama repositori. Jika repositori lokal sudah berisi, **jangan** centang "Initialize with README".

### Menghubungkan Repositori Lokal ke Remote

```bash
git remote add origin https://github.com/username/nama-repo.git
git branch -M main
git push -u origin main
```

`-u` hanya dipakai pertama kali. Berikutnya cukup `git push`.

Perintah remote lainnya:

```bash
git remote -v                       # lihat remote
git remote set-url origin URL-BARU  # ganti alamat remote (misal GitHub ke GitLab)
git remote remove origin            # hapus remote
```

### Mengambil Repositori yang Sudah Ada (Clone)

```bash
git clone https://github.com/username/nama-repo.git
cd nama-repo
```

Remote `origin` terpasang otomatis.

### Push, Fetch, dan Pull

```bash
git push                  # kirim commit ke remote
git fetch                 # ambil info terbaru, belum menggabungkan
git pull                  # fetch + merge
git pull --rebase         # fetch + rebase (riwayat lebih rapi)
```

### Alur Harian

```bash
git pull                  # 1. ambil perubahan terbaru
# ...bekerja...
git add .                 # 2. tambahkan
git commit -m "Pesan"     # 3. commit
git push                  # 4. kirim
```

### Pesan Error Umum Saat Push

| Pesan | Penyebab dan solusi |
|---|---|
| `rejected ... fetch first` | Remote punya commit yang belum ada di lokal. Jalankan `git pull`, lalu `git push` |
| `Authentication failed` | Token salah/kedaluwarsa, atau memasukkan password akun, bukan token |
| `src refspec main does not match any` | Belum ada commit, atau nama branch `master`. Cek `git branch` |
| `remote origin already exists` | Pakai `git remote set-url origin URL` |

---

## 11. Autentikasi: Token dan SSH

GitHub dan GitLab **tidak menerima password akun** untuk push lewat HTTPS. Ada dua cara.

### Cara 1: HTTPS dengan Personal Access Token (PAT)

**GitHub:** Settings, Developer settings, Personal access tokens, Fine-grained tokens. Batasi akses ke repositori tertentu dan beri masa berlaku.

**GitLab:** Avatar, Preferences, Access Tokens. Centang scope `read_repository` dan `write_repository`.

Saat `git push`:

- Username: nama akun
- Password: **token** (bukan password akun)

Simpan token di password manager. Token hanya ditampilkan sekali.

### Cara 2: SSH Key

Buat key (beri passphrase):

```bash
ssh-keygen -t ed25519 -C "email@contoh.com"
```

Tampilkan public key, lalu salin:

```bash
cat ~/.ssh/id_ed25519.pub
```

Tempel di:

- GitHub: Settings, SSH and GPG keys, New SSH key
- GitLab: Preferences, SSH Keys

Uji koneksi:

```bash
ssh -T git@github.com
ssh -T git@gitlab.com
```

Gunakan alamat remote SSH:

```bash
git remote add origin git@github.com:username/nama-repo.git
```

### Jika Port SSH (22) Diblokir

Gunakan SSH lewat port 443. Untuk GitHub, tambahkan di `~/.ssh/config`:

```
Host github.com
  Hostname ssh.github.com
  Port 443
  User git
```

Untuk GitLab:

```
Host gitlab.com
  Hostname altssh.gitlab.com
  Port 443
  User git
```

Atau gunakan HTTPS dengan token.

---

## 12. Kolaborasi: Fork, Pull Request, dan Konflik

### Dua Model Kolaborasi

**A. Satu repositori bersama.** Semua anggota diberi akses *collaborator*, bekerja di branch masing-masing, lalu menggabungkan lewat Pull Request.

**B. Fork.** Setiap orang menyalin (fork) repositori ke akunnya, bekerja di sana, lalu mengajukan Pull Request ke repositori asli. Umum dipakai di proyek open source.

### Alur Pull Request (Model A)

```bash
git switch -c fitur-navbar          # 1. buat branch
# ...edit, add, commit...
git push -u origin fitur-navbar     # 2. push branch
```

3. Buka GitHub, klik **Compare & pull request**.
4. Tulis judul dan deskripsi perubahan.
5. Minta rekan/guru melakukan *review*.
6. Setelah disetujui, klik **Merge pull request**.
7. Perbarui lokal:

```bash
git switch main
git pull
git branch -d fitur-navbar
```

### Alur Fork (Model B)

1. Klik **Fork** di halaman repositori asli.
2. Clone fork Anda: `git clone https://github.com/akun-anda/repo.git`
3. Tambahkan repositori asli sebagai `upstream`:

```bash
git remote add upstream https://github.com/pemilik-asli/repo.git
```

4. Sinkronkan dengan repositori asli secara berkala:

```bash
git fetch upstream
git switch main
git merge upstream/main
```

5. Kerjakan di branch baru, push ke fork, lalu buat Pull Request.

### Etika Kolaborasi

- Satu branch untuk satu tugas.
- `git pull` sebelum mulai bekerja.
- Commit kecil dan sering, dengan pesan jelas.
- Jangan langsung push ke `main` pada proyek bersama.
- Jangan `git push --force` pada branch bersama.

### Fitur Lain di GitHub

| Fitur | Fungsi |
|---|---|
| Issues | Mencatat tugas, bug, atau ide |
| Projects | Papan kanban untuk mengatur tugas |
| README.md | Halaman depan proyek |
| GitHub Pages | Hosting situs statis gratis |
| Actions | Otomatisasi (uji, build, deploy) |
| Releases | Menandai versi rilis |

### Membuat README yang Baik

```markdown
# Nama Proyek

Deskripsi singkat satu atau dua kalimat.

## Cara Menjalankan
1. Clone repositori
2. Buka index.html di browser

## Anggota Tim
- Nama 1
- Nama 2
```

---

## 13. Git di Komputer Lab Bersama

Komputer lab dipakai bergantian, jadi identitas dan kredensial siswa tidak boleh tertinggal.

### Prinsip

1. **Jangan ada identitas global.** Hapus dan cegah penebakan otomatis:

```bash
git config --global --unset user.name
git config --global --unset user.email
git config --global user.useConfigOnly true
```

Dengan `user.useConfigOnly true`, Git menolak commit sampai identitas diisi.

2. **Identitas per repositori** (tanpa `--global`):

```bash
git config user.name "Nama Siswa"
git config user.email "email@siswa.com"
```

3. **Jangan simpan kredensial.** Matikan penyimpanan otomatis:

```bash
git config --global credential.helper ""
```

Di Windows, Git Credential Manager menyimpan login di Windows Credential Manager. Hapus manual lewat *Control Panel, Credential Manager* jika perlu.

4. **SSH key di flashdisk**, bukan di `~/.ssh` komputer lab:

```bash
ssh-keygen -t ed25519 -f /path/flashdisk/id_ed25519 -C "nama-siswa"
git config core.sshCommand "ssh -i /path/flashdisk/id_ed25519 -o IdentitiesOnly=yes"
```

Wajib memakai passphrase.

5. **Satu akun per siswa.** Jangan memakai satu akun bersama untuk seluruh kelas.

### Checklist Akhir Sesi

- [ ] `git config --global --list` tidak berisi nama/email siswa
- [ ] Tidak ada login tersimpan di Credential Manager
- [ ] Tidak ada key tertinggal di `~/.ssh`
- [ ] Browser sudah logout dari GitHub/GitLab
- [ ] Folder proyek sudah dipindahkan atau dihapus dari komputer lab

### Skrip Pembersihan Otomatis (Windows, .bat)

```bat
@echo off
git config --global --unset user.name
git config --global --unset user.email
cmdkey /list | findstr "git:https://github.com" >nul && cmdkey /delete:git:https://github.com
cmdkey /list | findstr "git:https://gitlab.com" >nul && cmdkey /delete:git:https://gitlab.com
echo Pembersihan selesai.
pause
```

### Skrip Pembersihan (Linux, .sh)

```bash
#!/bin/bash
git config --global --unset user.name
git config --global --unset user.email
rm -f ~/.git-credentials
echo "Pembersihan selesai."
```

> Cara paling efektif: akun login terpisah per siswa, atau profil yang direset otomatis setiap restart (misalnya Deep Freeze).

---

## 14. Kesalahan Umum dan Solusinya

| Masalah | Solusi |
|---|---|
| Salah ketik `git log oneline` | Gunakan `git log --oneline` (dua minus) |
| `nothing to commit, working tree clean` | Bukan error. Tidak ada perubahan untuk di-commit |
| `detached HEAD` | Normal saat melihat commit lama. Kembali dengan `git switch -` |
| Lupa identitas: `Please tell me who you are` | Atur `user.name` dan `user.email` |
| Commit file rahasia (`.env`) | Ganti rahasia itu segera, hapus dari Git dengan `git rm --cached`, tambahkan ke `.gitignore` |
| Terlanjur `reset --hard` | Coba `git reflog` lalu `git reset --hard <ID>` |
| Push ditolak setelah `reset` | Gunakan `git revert` untuk commit yang sudah di-push |
| `fatal: not a git repository` | Belum di folder repositori. Jalankan `git init` atau `cd` ke folder yang benar |
| Folder kosong tidak terlacak | Git hanya melacak file. Tambahkan file `.gitkeep` |
| `error: failed to push some refs` | `git pull` dulu, selesaikan konflik jika ada, lalu push |

---

## 15. Cheat Sheet

### Persiapan

```bash
git config --global user.name "Nama"
git config --global user.email "email"
git init
git clone URL
```

### Siklus Harian

```bash
git status
git add .
git commit -m "Pesan"
git pull
git push
```

### Riwayat

```bash
git log --oneline --graph
git diff
git diff --staged
git show ID
```

### Membatalkan

```bash
git restore file
git restore --staged file
git restore --source=ID file
git commit --amend
git reset --soft HEAD~1
git reset --hard ID
git revert ID
git reflog
```

### Branch

```bash
git branch
git switch -c nama
git switch nama
git merge nama
git branch -d nama
```

### Remote

```bash
git remote -v
git remote add origin URL
git remote set-url origin URL
git push -u origin main
git fetch
git pull
```

### Stash

```bash
git stash
git stash list
git stash pop
```


## Referensi

- Dokumentasi resmi Git: https://git-scm.com/doc
- Buku Pro Git (gratis, tersedia dalam Bahasa Indonesia): https://git-scm.com/book
- GitHub Docs: https://docs.github.com
- GitLab Docs: https://docs.gitlab.com
- Template .gitignore: https://github.com/github/gitignore