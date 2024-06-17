let mainCharacter;
let secondCharacter;
let itemElement;
let score = 0;
let timer = 30; // 초기 시간을 30초로 설정
let gameInterval;
let itemTimeout;
let currentItem = {};
let displayedItem = {};
const items = [
    { name: "토리든 세럼", image: "items/item1.png" },
    { name: "세타필 바디워시", image: "items/item2.png" },
    { name: "퍼펙트 휩", image: "items/item3.png" },
    { name: "닥터지 수분크림", image: "items/item4.png" },
    { name: "마녀공장 클렌징오일", image: "items/item5.png" },
    { name: "닥터지 선크림", image: "items/item6.png" },
    { name: "VT 니들샷", image: "items/item7.png" },
    { name: "바이오더마 클렌징", image: "items/item8.png" },
    { name: "라포슈포제", image: "items/item9.png" },
    { name: "브링그린 코팩", image: "items/item10.png" }
];

document.addEventListener('DOMContentLoaded', () => {
    mainCharacter = document.getElementById('main-character');
    secondCharacter = document.getElementById('second-character');
    itemElement = document.getElementById('item');
    document.getElementById('item').addEventListener('click', handleItemClick);
});

function startGame() {
    document.getElementById('main-title-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    score = 0;
    timer = 30; // 초기 타이머 값을 30초로 설정
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timer;

    mainCharacter.style.left = 'calc(100% - 200px)'; // 오른쪽 하단에 고정, 게임 화면의 오른쪽에서 200px 떨어진 곳에 고정
    mainCharacter.style.bottom = '10%';
    mainCharacter.style.display = 'block';

    secondCharacter.style.left = '0%';
    secondCharacter.style.bottom = '20%';
    secondCharacter.style.display = 'block';

    itemElement.style.left = '0%';
    itemElement.style.top = '75%'; // 높이를 낮게 설정
    itemElement.style.display = 'block';

    gameInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = timer;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);

    nextItem();
}

function nextItem() {
    clearTimeout(itemTimeout); // 이전 타이머를 정리합니다.

    const randomIndex = Math.floor(Math.random() * items.length);
    currentItem = items[randomIndex];

    // 50% 확률로 맞는 상품을 표시, 50% 확률로 틀린 상품을 표시
    let displayedIndex;
    if (Math.random() < 0.5) {
        displayedIndex = randomIndex;
    } else {
        do {
            displayedIndex = Math.floor(Math.random() * items.length);
        } while (displayedIndex === randomIndex);
    }

    displayedItem = items[displayedIndex];
    const itemNameElement = document.getElementById('item-name');
    itemNameElement.innerText = displayedItem.name;

    // 아이템 및 두 번째 캐릭터 초기 위치 설정
    secondCharacter.style.transition = 'none';
    secondCharacter.style.left = '0%';
    itemElement.style.transition = 'none';
    itemElement.style.left = '0%';
    itemElement.style.top = '75%'; // 높이를 낮게 설정
    itemElement.style.backgroundImage = `url(${currentItem.image})`;

    // 다음 프레임에서 이동 애니메이션 설정
    requestAnimationFrame(() => {
        secondCharacter.style.transition = 'left 1s linear'; // 이동 속도를 빠르게 설정
        itemElement.style.transition = 'left 1s linear'; // 이동 속도를 빠르게 설정
        secondCharacter.style.left = 'calc(100% - 250px)'; // 메인 캐릭터보다 50px 앞에서 멈춤
        itemElement.style.left = 'calc(100% - 250px)'; // 메인 캐릭터보다 50px 앞에서 멈춤
    });

    // 1초 후 임팩트 생성 및 클릭 이벤트 활성화
    setTimeout(() => {
        // 임팩트 생성 코드 (예: 애니메이션 효과 추가)
        itemElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            itemElement.style.transform = 'scale(1)';
        }, 500);

        // 클릭 이벤트 활성화
        itemElement.addEventListener('click', handleItemClick);

        // 1초 후 아이템과 캐릭터를 초기화하고 새 아이템 생성
        itemTimeout = setTimeout(() => {
            itemElement.removeEventListener('click', handleItemClick);
            nextItem();
        }, 1000);
    }, 1000); // 1초 동안 이동 후 1초 동안 클릭 결정 시간 부여
}

function handleItemClick() {
    if (currentItem.name === displayedItem.name) {
        score++;
        itemElement.classList.add('correct-impact');
        setTimeout(() => itemElement.classList.remove('correct-impact'), 1000);
    } else {
        score--;
        itemElement.classList.add('wrong-impact');
        setTimeout(() => itemElement.classList.remove('wrong-impact'), 1000);
    }
    document.getElementById('score').innerText = score;
    // 클릭 이벤트 제거
    itemElement.removeEventListener('click', handleItemClick);
}

function endGame() {
    clearInterval(gameInterval);
    clearTimeout(itemTimeout);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;

    const gameOverImage = document.getElementById('game-over-image');
    if (score >= 10) {
        gameOverImage.src = 'success.gif';
    } else {
        gameOverImage.src = 'fail.gif';
    }
}

function restartGame() {
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('main-title-screen').classList.remove('hidden');
}
