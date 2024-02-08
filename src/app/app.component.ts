import { Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  password:string = '';
  includeUpperCaseLetters = true;
  includeLowerCaseLetters = true;
  includeNumbers = true;
  includeSymbols = true;
  sliderValue: number = 10;
  options: Options = {
    floor: 0,
    ceil: 20
  };
  passwordStrength: any;
  
  constructor(private clipboard: Clipboard){}


  disabledBth() {
    return !(this.sliderValue !== 0 && (this.includeUpperCaseLetters || this.includeLowerCaseLetters || this.includeNumbers || this.includeSymbols))
  }

  onChangeUseUpperLetters() {
    this.includeUpperCaseLetters = !this.includeUpperCaseLetters
  }

  onChangeUseLowerLetters() {
    this.includeLowerCaseLetters = !this.includeLowerCaseLetters
  }

  onChangeUseNumbers() {
    this.includeNumbers = !this.includeNumbers
  }

  onChangeUseSymbols() {
    this.includeSymbols = !this.includeSymbols
  }

  generatePassword() {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_-,.'

    let availableCharacters = ''

    if (this.includeUpperCaseLetters) {
      availableCharacters += upperCaseLetters
    }

    if(this.includeLowerCaseLetters){
      availableCharacters += lowerCaseLetters
    }

    if (this.includeNumbers) {
      availableCharacters += numbers
    }

    if (this.includeSymbols) {
      availableCharacters += symbols
    }

    availableCharacters.split('')
    const generatedPassword = []

    for (let i = 0; i < this.sliderValue; i += 1) {
      const maxValue = availableCharacters.length;
      const randomValue = Math.floor(Math.random() * maxValue);
      generatedPassword.push(availableCharacters[randomValue]);
    }
    this.password = generatedPassword.join('')
    this.checkPasswordStrength(this.password)
  }

  checkPasswordStrength(password:any){
    if (password.length <= 6) {
      this.passwordStrength = 'Weak';
    } else if (password.length <= 10 && password.length  > 6) {
      this.passwordStrength = 'Medium';
    } else {
      this.passwordStrength = 'Strong';
    }
  }

  copyToClipboard(){
    if(this.password){
      this.clipboard.copy(this.password);
      alert('Copied successfully');
    }
  }
}
