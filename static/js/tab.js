(function () {
  let tablist = document.querySelectorAll('[role="tablist"]')[0];
  let tabs;
  let panels;
  let delay = determineDelay();

  generateArrays();

  function generateArrays() {
    tabs = document.querySelectorAll('[role="tab"]');
    panels = document.querySelectorAll('[role="tabpanel"]');
  }

  let keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46,
  };

  let direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1,
  };

  for (i = 0; i < tabs.length; ++i) {
    addListeners(i);
  }

  function addListeners(index) {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener);
    tabs[index].addEventListener('keyup', keyupEventListener);
    tabs[index].index = index;
  }

  //activateTab 활성화

  function clickEventListener(event) {
    let tab = event.target;
    activateTab(tab, false);
  }

  //Keydown 처리
  function keydownEventListener(event) {
    let key = event.keyCode;
    switch (key) {
      case keys.end:
        event.preventDefault();
        activateTab(tabs[tabs.length - 1]);
        break;
      case keys.home:
        event.preventDefault();
        activateTab(tabs[0]);
        break;
      case keys.up:
      case keys.down:
        determineOrientation(event);
        break;
    }
  }

  //Keyup 처리
  function keyupEventListener(event) {
    let key = event.keyCode;
    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
      case keys.delete:
        determineDeletable(event);
        break;
    }
  }

  //키보드 제어
  function determineOrientation(event) {
    let key = event.keyCode;
    let vertical = tablist.getAttribute('aria-orientation') == 'vertical';
    let proceed = false;
    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      }
    } else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      }
    }
    if (proceed) {
      switchTabOnArrowPress(event);
    }
  }

  //포커스 제어
  function switchTabOnArrowPress(event) {
    let pressed = event.keyCode;
    for (x = 0; x < tabs.length; x++) {
      tabs[x].addEventListener('focus', focusEventHandler);
    }
    if (direction[pressed]) {
      let target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        } else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab();
        } else if (pressed === keys.right || pressed == keys.down) {
          focusFirstTab();
        }
      }
    }
  }

  // 탭 활성화
  function activateTab(tab, setFocus) {
    setFocus = setFocus || true;
    // 탭 비활성화
    deactivateTabs();
    // tabindex 제거
    tab.removeAttribute('tabindex');
    // aria-selected true 변환
    tab.setAttribute('aria-selected', 'true');
    // aria-controls 값 출력
    let controls = tab.getAttribute('aria-controls');
    // 탭패널 hidden 삭제
    document.getElementById(controls).removeAttribute('hidden');
    // 포커스 설정
    if (setFocus) {
      tab.focus();
    }
  }

  // 다른 탭 및 탭패널 비활성화
  function deactivateTabs() {
    for (t = 0; t < tabs.length; t++) {
      tabs[t].setAttribute('tabindex', '-1');
      tabs[t].setAttribute('aria-selected', 'false');
      tabs[t].removeEventListener('focus', focusEventHandler);
    }
    for (p = 0; p < panels.length; p++) {
      panels[p].setAttribute('hidden', 'hidden');
    }
  }

  //포커스 제어
  function focusFirstTab() {
    tabs[0].focus();
  }
  function focusLastTab() {
    tabs[tabs.length - 1].focus();
  }

  function determineDeletable(event) {
    target = event.target;
    if (target.getAttribute('data-deletable') !== null) {
      //해당 탭 삭제
      deleteTab(event, target);
      // 탭 배열 업데이트
      generateArrays();
      // 제거한 탭에 가까운 탭 활성화
      if (target.index - 1 < 0) {
        activateTab(tabs[0]);
      } else {
        activateTab(tabs[target.index - 1]);
      }
    }
  }

  //탭과 해당패널 삭제
  function deleteTab(event) {
    let target = event.target;
    let panel = document.getElementById(target.getAttribute('aria-controls'));
    target.parentElement.removeChild(target);
    panel.parentElement.removeChild(panel);
  }

  //키보드 제어 딜레이
  function determineDelay() {
    let hasDelay = tablist.hasAttribute('data-delay');
    let delay = 0;
    if (hasDelay) {
      var delayValue = tablist.getAttribute('data-delay');
      if (delayValue) {
        delay = delayValue;
      } else {
        delay = 300;
      }
    }
    return delay;
  }

  function focusEventHandler(event) {
    let target = event.target;
    setTimeout(checkTabFocus, delay, target);
  }

  // 딜레이 후 포커스
  function checkTabFocus(target) {
    focused = document.activeElement;
    if (target === focused) {
      activateTab(target, false);
    }
  }
})();
