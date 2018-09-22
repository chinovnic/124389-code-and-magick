'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// цвета мантий
var blueColor = 'rgb(101, 137, 164)';
var magentaColor = 'rgb(241, 43, 107)';
var purpleColor = 'rgb(146, 100, 161)';
var greenColor = 'rgb(56, 159, 117)';
var yellowColor = 'rgb(215, 210, 55)';
var blackColor = 'rgb(0, 0, 0)';

// цвета фаерболов
var capOfSantaClausColor = '#ee4830';
var azureColor = '#30a8ee';
var aquamarineColor = '#5ce6c0';
var fuchsiaColor = '#e848d5';
var mustardColor = '#e6e848';

// исходные данные волшебников
var nameNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var nameSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = [blueColor, magentaColor, purpleColor, greenColor, yellowColor, blackColor];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColor = [capOfSantaClausColor, azureColor, aquamarineColor, fuchsiaColor, mustardColor];


// получить рандомное значение из массива
function getRandomValue(items) {
  var rand = Math.floor(Math.random() * items.length);
  var randomValue = items[rand];
  return randomValue;
}


// создать рандомного волшебника
function getRandomWizard() {
  var randomWizard = {
    name: getRandomValue(nameNames) + ' ' + getRandomValue(nameSurnames),
    coatColor: getRandomValue(coatColor),
    eyesColor: getRandomValue(eyesColor)
  };
  return randomWizard;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true); // полностью клонировать шаблон

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // добавить имена
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // добавить цвет мантий
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // добавить цвет глаз

  return wizardElement;
}


/**
 * изменение волшебника пользователя
 * @param {array} array массив со строковыми значениями цветов
 * @param {object} object часть svg, который нужно покрасить
 * @param {object} objectInput input, с которым связан svg для передачи значения на сервер
 */
function chooseObjectColor(array, object, objectInput) {
  var color = getRandomValue(array);

  if (object.style.fill === color) {
    color = getRandomValue(array);
    object.style.fill = color;
  } else {
    object.style.fill = color;
  }
  objectInput.value = color;
}

function onWizardCoatClick() {
  chooseObjectColor(coatColor, wizardCoat, wizardCoatInput);
}


function onWizardEyesClick() {
  chooseObjectColor(eyesColor, wizardEyes, wizardEyesInput);
}

/**
 * изменение фаербола волшебника пользователя
 */
function onWizardFireballClick() {
  var color = getRandomValue(fireballColor);

  if (wizardFireball.style.backgroundColor === color) {
    color = getRandomValue(fireballColor);
    wizardFireball.style.backgroundColor = color;
  } else {
    wizardFireball.style.backgroundColor = color;
  }

  wizardFireballInput.value = color;
}


// открытие и закрытие попапа
function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    closePopup();
  }
}

function openPopup() {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}


// работа с DOM
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list'); // div со списком похожих персонажей
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'); // div с шаблоном

var openUserDialog = document.querySelector('.setup-open'); // аватарка пользователя
var setupClose = userDialog.querySelector('.setup-close'); // крестик на попапе пользователя
var userNameInput = userDialog.querySelector('.setup-user-name'); // имя пользователя

var wizardCoat = userDialog.querySelector('.wizard-coat');
var wizardEyes = userDialog.querySelector('.wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var wizardCoatInput = userDialog.querySelector('input[name="coat-color"]');
var wizardEyesInput = userDialog.querySelector('input[name="eyes-color"]');
var wizardFireballInput = userDialog.querySelector('input[name="fireball-color"]');


userDialog.querySelector('.setup-similar').classList.remove('hidden'); // открыть вкладку "Похожие персонажи"


// открытие и закрытие попапа пользователя
openUserDialog.addEventListener('click', function () {
  openPopup();
});

openUserDialog.addEventListener('keydown', function () {
  onPopupEscPress();
});

openUserDialog.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


// изменения волшебника пользователя
wizardCoat.addEventListener('click', onWizardCoatClick);
wizardEyes.addEventListener('click', onWizardEyesClick);
wizardFireball.addEventListener('click', onWizardFireballClick);


// валидация формы попапа пользователя
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});


// создать массив из 4 рандомных волшебников
var wizards = [];
while (wizards.length < 4) {
  var oneWizard = getRandomWizard();
  wizards.push(oneWizard);
}


// создать похожих волшебников
var fragment = document.createDocumentFragment(); // создать фрагмент документа, чтобы добавить в него новые элементы и присоединить к основному дереву
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i])); // во фрагмент добавляются волшебники из функции renderWizard
}
similarListElement.appendChild(fragment); // вставить фрагмент в div
