function generatePassword(options) {
  const { length, number, letters, capitalLetters, symbols } = options;
  let characterPool;
  if (letters) {
    characterPool += "abcdefghijklmnopqrstuvwxyz";
  }
  if (capitalLetters) {
    characterPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (number) {
    characterPool += "0123456789";
  }
  if (symbols) {
    characterPool += "!@#$%^&*()_+[]{}|;:,.<>?";
  }

  if(characterPool === "") {
   throw new Error("Select characters to include");
  }

  let password = ""
  for(i = 0; i < length; i++){
   const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }
  return password
}



let options = {
 length: 10,
 number: true,
 letters: true,
 capitalLetters: true,
 symbols: true,
};

console.log('Generated Password:', generatePassword(options));