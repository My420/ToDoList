const mainProgramScreen = document.querySelector(`.tasks__list`);

const cleanScreen = function () {
  while (mainProgramScreen.firstChild) {
    mainProgramScreen.removeChild(mainProgramScreen.firstChild);
  }
};

const showScreen = function (element, needCleanScreen = true) {
  if (needCleanScreen) {
    cleanScreen();
    mainProgramScreen.appendChild(element);
  } else {
    mainProgramScreen.appendChild(element);
  }
};

export default showScreen;
