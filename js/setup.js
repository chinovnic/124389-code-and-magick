'use strict';

// цвета мантий
var blueColor = 'rgb(101, 137, 164)';
var magentaColor = 'rgb(241, 43, 107)';
var purpleColor = 'rgb(146, 100, 161)';
var greenColor = 'rgb(56, 159, 117)';
var yellowColor = 'rgb(215, 210, 55)';
var blackColor = 'rgb(0, 0, 0)';

// исходные данные волшебников
var nameNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var nameSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = [blueColor, magentaColor, purpleColor, greenColor, yellowColor, blackColor];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];


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

// работа с DOM
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list'); // div со списком похожих персонажей
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'); // div с шаблоном

userDialog.classList.remove('hidden'); // открыть блок с аватаром
userDialog.querySelector('.setup-similar').classList.remove('hidden'); // открыть вкладку "Похожие персонажи"


// создать массив из 4 рандомных волшебников
var wizards = [];
while (wizards.length < 4) {
  var oneWizard = getRandomWizard();
  wizards.push(oneWizard);
}

// создать фрагмент документа, чтобы добавить в него новые элементы и присоединить к основному дереву
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i])); // во фрагмент добавляются волшебники из функции renderWizard
}
similarListElement.appendChild(fragment); // вставить фрагмент в div
