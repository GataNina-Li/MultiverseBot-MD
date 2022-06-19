pkg update && pkg upgrade
pkg install git -y
pkg install nodejs -y
pkg install ffmpeg -y
pkg install imagemagick -y
pkg install yarn
git clone https://github.com/GataNina-Li/EstelarBot-MD
cd EstelarBot-MD
yarn
npm install
node .

pkg update && pkg upgrade
apt update && apt upgrade
bin=$PREFIX/bin
dir=$(pwd)
normal='\e[0m'
if [ -e $bin/git ]; then 
  echo -e "\u001b[32mYa esta instalado el git, en ese caso lo omitiremos"
else 
  echo -e "\u001b[31mInstaling \u001b[31mgit!"
  pkg install git -y
  echo -e "\u001b[32mGenial!! ya esta el install git!"
fi

if [ -e $bin/node ]; then 
  echo -e "\u001b[32mYa esta instalado el nodejs, en ese caso lo omitiremos"
else 
  echo -e "\u001b[31mInstaling \u001b[31mnodejs!"
  pkg install nodejs -y
  echo -e "\u001b[32mGenial!! ya esta el install nodejs!"
fi

echo -e "\u001b[33mComprobación de la instalación!"

if [ -e $bin/ffmpeg ]; then 
  echo -e "\u001b[32mYa esta instalado el ffmpeg, en ese caso lo omitiremos"
else
  echo -e "\u001b[31mInstaling \u001b[31mffmpeg!"
  pkg install ffmpeg -y
  echo -e "\u001b[32mGenial!! ya esta el install ffmpeg!"
fi

echo -e "\u001b[33mComprobación de la instalación!"

if [ -e $bin/magick ]; then 
  echo -e "\u001b[32mYa esta instalado el imagemagick, en ese caso lo omitiremos"
else
  echo -e "\u001b[31mInstaling \u001b[31mimagemagick!"
  pkg install imagemagick -y
  echo -e "\u001b[32mGenial!! ya esta el install imagemagick!"
fi

echo -e "\u001b[33mComprobación de la instalación!"

check() {
  if [ -e $bin/git ]; then
    echo -e "\u001b[32mGit ya está instalado!"
  else
    echo -e "\u001b[31mGit no instalado!, instalar manualmente usando `pkg install git -y` o `apt install git -y` y después de eso, escriba `bash install2.sh`"
    exit 1
  fi
  
  
  if [ -e $bin/node ]; then
    echo -e "\u001b[32mNodejs ya está instalado!"
  else
    echo -e "\u001b[31mNodejs not installed!!, instalar manualmente usando `pkg install nodejs -y` o `apt install nodejs -y`"
  fi 
  
  
  if [ -e $bin/ffmpeg ]; then
    echo -e "\u001b[32mFfmpeg ya está instalado!" 
  else
    echo -e "\u001b[31mFfmpeg no instalado!, instalar manualmente usando `pkg install ffmpeg -y` o `apt install ffmpeg -y`"
  fi 


  if [ -e $bin/magick ]; then
    echo -e "\u001b[32mImagemagick ya está instalado!" 
  else
    echo -e "\u001b[31mImagemagick no instalado!, instalar manualmente usando `pkg install imagemagick -y` o `apt install imagemagick -y`"
  fi   
}


check
echo -e "\u001b[32mDone checking instalation!" 

echo -e "\u001b[36mClonar el repositorio!"
git clone https://github.com/GataNina-Li/EstelarBot-MD.git EstelarBot-MD
if [ -d $dir/EstelarBot-MD ]; then
  echo -e "\u001b[36mListo clone reposito!"
else
  echo -e "\u001b[31mFallo clone reposito!"
  exit 1
fi

echo -e "\u001b[36mCambiar working directory!"
cd EstelarBot-MD
main_dir=$(pwd)
if [ $main_dir != $dir ]; then
  echo -e "\u001b[36mListo change working directory!"
  echo -e "\u001b[36mInstalling bot!"
  bash install.sh
else 
  echo -e "\u001b[31mFallo to change working directory!!"
  exit 1
fi

check
echo -e "\u001b[32mDone checking instalation!" 

echo -e "\u001b[33mInstall and update module!"
if [ -e $dir/package.json ]; then
  npm install
  npm update
  echo -e "\u001b[32Done Install and update module!" 
else 
  echo -e "\u001b[31mPackage.json not found!"
fi 
