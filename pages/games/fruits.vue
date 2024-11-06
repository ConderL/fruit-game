<script setup lang="ts">
  import '@/assets/index.css'
  import { fruitsData, sortedFruitsData } from '~/constants'
  // @ts-ignore
  import familyMp3 from '@/public/audio/family.mp3'

  // @ts-ignore
  const images = import.meta.glob('@/public/img/form*.png')

  const getImage = (index: number) => {
    // 动态加载图片
    const imagePath = `@/public/img/form${index + 1}.png`
    return images[imagePath] ? images[imagePath]() : '' // 返回图片路径
  }

  const toggleRankWidth = ref(false)
  const toggleIntroWidth = ref(false)
  const scores = ref(new Array(8).fill(0))
  const fruitActiveIndex = ref(-1)
  const fruitActiveIndexGroup = ref<number[]>([])
  const popup = ref(null)
  const money = ref(100)
  const currentScore = ref(0)
  const isWarning = ref(false)

  let keyPressed = false
  let circleCount = 0
  let isRunning = false
  let timeout: NodeJS.Timeout
  let interval: number
  let luckyNum = 0
  let isEnd = false
  let isLucking = false

  const resetData = () => {
    keyPressed = false
    circleCount = 0
    isRunning = false
    interval = 0
    luckyNum = 0
    isEnd = false
    isLucking = false
    fruitActiveIndexGroup.value = []
    currentScore.value = 0
    fruitActiveIndex.value = 0
  }

  const resetSidebar = () => {
    toggleRankWidth.value = false
    toggleIntroWidth.value = false
  }

  const activedImg = computed(() =>
    fruitsData.find((fruit) => fruit.index === fruitActiveIndex.value),
  )

  const selectedFruits = computed(() =>
    scores.value.map((count, i) => ({ i, count })).filter(({ count }) => count),
  )

  const allScore = computed(() => scores.value.reduce((pre, cur) => pre + cur))

  const handleFruitButton = async (i: number) => {
    if (isRunning || allScore.value === money.value) return
    scores.value.splice(i, 1, scores.value[i] + 1)

    const mp3 = await import(
      /* @vite-ignore */
      `/public/audio/press/press_${i + 1}.mp3`
    )
    const audio = new Audio(mp3.default.replace('/@fs/__skip_vite', ''))
    audio.currentTime = 0.2
    audio.play()
  }

  const changeNumAnimate = (isIncrease = true) => {
    let intervalId: NodeJS.Timeout

    if (isIncrease) {
      interval = 16.6
      intervalId = setInterval(() => {
        interval = Math.min(300, interval * 1.3)
        if (interval >= 300) {
          clearInterval(intervalId)
        }
      }, interval)
    } else {
      interval = 300
      intervalId = setInterval(() => {
        interval = Math.max(16.6, interval * 0.7)
        if (interval <= 16.6) {
          clearInterval(intervalId)
        }
      }, interval)
    }
  }

  const playFruitAudio = async () => {
    const audio = new Audio(sortedFruitsData[fruitActiveIndex.value].audioSrc)
    audio.play()
  }

  const changeNum = (
    maxCircleCount = 6,
    isUniform = false,
    isIncrease = true,
  ) => {
    isRunning = true

    function recursive(resolve: () => void) {
      timeout = setTimeout(() => {
        if (fruitActiveIndex.value === 24 && isIncrease) {
          circleCount++
          fruitActiveIndex.value = 0
        }

        if (fruitActiveIndex.value === 0 && !isIncrease) {
          circleCount++
          fruitActiveIndex.value = 24
        }

        const isLuckyConditionMet =
          (luckyNum < 12 &&
            circleCount === maxCircleCount - 1 &&
            luckyNum + 12 === fruitActiveIndex.value) ||
          (luckyNum >= 12 &&
            circleCount === maxCircleCount &&
            luckyNum - 12 === fruitActiveIndex.value)

        if (isLuckyConditionMet && !isUniform) {
          changeNumAnimate()
          isEnd = true
        }

        if (
          (isEnd || maxCircleCount === 1) &&
          luckyNum === fruitActiveIndex.value
        ) {
          if (isEnd) {
            playFruitAudio()
          }
          resolve() // 返回字符串
          handleEnd()
          return clearTimeout(timeout)
        }

        if (isIncrease) {
          fruitActiveIndex.value++
        } else {
          fruitActiveIndex.value--
        }

        return recursive(resolve)
      }, interval)
    }

    return new Promise<void>((resolve) => {
      recursive(resolve)
    })
  }

  const getRandom = () => {
    return new Promise<number>((res) => {
      let random: number
      while (true) {
        random = ~~(Math.random() * 24)
        const isExit = [...fruitActiveIndexGroup.value, 9, 21].some(
          (num) => num === random,
        )
        if (!isExit) {
          break
        }
      }
      return res(random)
    })
  }

  const handleExtraAnimate = () => {
    isWarning.value = true
    const audio = new Audio(familyMp3)
    audio.play()
    interval = 100

    setTimeout(async () => {
      luckyNum = await getRandom()
      await changeNum(1, true)
      fruitActiveIndexGroup.value.push(luckyNum)

      luckyNum = await getRandom()
      await changeNum(1, true, false)
      fruitActiveIndexGroup.value.push(luckyNum)

      luckyNum = await getRandom()
      await changeNum(1, true)
      fruitActiveIndexGroup.value.push(luckyNum)

      isLucking = false
      isWarning.value = false
      setTimeout(() => {
        audio.pause()
      }, 1000)
    }, 300)
  }

  const updateMoney = () => {
    money.value = money.value - allScore.value + currentScore.value
  }

  const handleEnd = () => {
    circleCount = 0
    isEnd = false
    isRunning = false

    const score = sortedFruitsData[fruitActiveIndex.value].score ?? 0
    const index = sortedFruitsData[fruitActiveIndex.value].point

    if (score) {
      currentScore.value +=
        score * (index !== undefined ? scores.value[index] : 0)
    }

    if (!score && !isLucking) {
      fruitActiveIndexGroup.value.push(fruitActiveIndex.value)
      isLucking = true
      return handleExtraAnimate()
    } else {
      updateMoney()
    }
  }

  const handleStart = () => {
    if (isRunning || allScore.value > money.value || !allScore.value) return
    resetData()
    changeNumAnimate(false)
    luckyNum = ~~(Math.random() * 24)
    changeNum()
  }

  const handleKeyup = (event: KeyboardEvent) => {
    keyPressed = false
  }

  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key
    if (key >= '1' && key <= '8' && !keyPressed) {
      const buttonNumber = parseInt(key)
      handleFruitButton(buttonNumber - 1)
    }
    if (key === 'Enter') {
      handleStart()
    }
    keyPressed = true
  }

  const showPopup = () => {
    // @ts-ignore
    popup.value.openPopup()
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keyup', handleKeyup)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('keyup', handleKeyup)
  })
</script>

<template>
  <TechPopup title="选择你的支付方式" ref="popup">
    <div class="flex justify-between w-400px my-30px">
      <img class="w-100px cursor-pointer" src="@/public/img/alipay.png" />
      <img class="w-100px cursor-pointer" src="@/public/img/wechatpay.png" />
      <img class="w-100px cursor-pointer" src="@/public/img/images.jpg" />
    </div>
  </TechPopup>
  <div class="gamezone" @click="resetSidebar">
    <div
      @click.stop
      :class="[
        'rank',
        'transition-all',
        { 'w-[55px]': !toggleRankWidth, 'w-[284px]': toggleRankWidth },
      ]"
    >
      <div @click="toggleRankWidth = !toggleRankWidth" class="show_rank"></div>
      <ul class="mt-[35px] text-[12px] text-white overflow-hidden">
        <li v-for="item in mockRankData" class="ml-[101px] h-[43px]">
          <img class="size-[34px] rounded-[1px]" />
          <div class="relative top-[-35px] left-[48px]">
            <div>{{ item.name }}</div>
            <div>赚取：{{ item.rank }}&nbsp;积分</div>
          </div>
        </li>
      </ul>
    </div>
    <div
      @click.stop
      :class="[
        'intro',
        'transition-all',
        { 'w-[55px]': !toggleIntroWidth, 'w-[284px]': toggleIntroWidth },
      ]"
    >
      <div
        @click="toggleIntroWidth = !toggleIntroWidth"
        class="show_intro"
      ></div>
      <div class="desc">
        用键盘也能操作啦！（字母键盘上的数字键分别对应不同水果）。<br />小水果的赔率均为2倍，即押1赔2，大水果的赔率按照下方按键中的显示赔率，如大77的赔率则为押1赔40。<br />积分不足别忘了可以随时充值哦，建议每次玩的时候不要总是单押一个，苹果的赔率虽低，但是几率会大一些哦。<br />
      </div>
    </div>
    <div class="gametop">
      <div class="gamescore">
        <div class="gamescore_zone">
          <div>
            <span id="upExtcredits">{{ currentScore }}</span>
          </div>
          <div>
            <span id="allExtcredits">{{ money }}</span>
          </div>
        </div>
      </div>

      <div class="w-full h-[470px] p-[20px]">
        <div class="gameeffect">
          <ul>
            <li
              v-for="fruit in fruitsData"
              :class="[
                'relative',
                {
                  active:
                    fruitActiveIndex === fruit.index ||
                    (fruitActiveIndexGroup[0] &&
                      fruitActiveIndexGroup[0] === fruit.index),
                  'active-green':
                    (fruitActiveIndex === fruit.index && isWarning) ||
                    fruitActiveIndexGroup
                      .slice(1)
                      .some((i) => i === fruit.index),
                },
              ]"
              :style="{ backgroundColor: fruit.color }"
            >
              <img v-if="fruit.src" :src="fruit.src" />
            </li>
            <ul>
              <div
                class="gamevs_zone"
                style="
                  background-image: url('/_nuxt/public/img/20150116200012731.jpg');
                "
              >
                <div
                  id="systemChoose"
                  class="gamevs_zone_pc"
                  style="box-shadow: none; background: none"
                >
                  <img v-if="activedImg" :src="activedImg.src" alt="" />
                </div>
                <div
                  id="memberChoose"
                  class="gamevs_zone_player"
                  style="box-shadow: none; background: none"
                ></div>
                <div class="gamevs_zone_vs">
                  <span>{{ allScore }}</span>
                </div>
              </div>
            </ul>
          </ul>
        </div>
        <div class="gamemsg">
          <div class="gamemsg_zone" style="height: 90px">
            <div class="gamemsg_title">我的信息</div>
            <div class="userinfo">
              <img src="@/public/img/1707160216218.jpg" />
              <div>昵称：Conder</div>
              <div>积分：<span id="span">0</span></div>
              <div
                class="top-[67px] left-[175px] cursor-pointer absolute"
                @click="showPopup"
              >
                充值
              </div>
              <div class="top-[67px] left-[207px] cursor-pointer absolute">
                提现
              </div>
            </div>
          </div>
          <div class="gamemsg_zone" style="height: 90px">
            <div class="gamemsg_title">最近记录</div>
            <div class="userlog">
              不小心输掉了&nbsp;2&nbsp;积分
              <br />
              刚刚又赚了&nbsp;2&nbsp;积分
              <br />
              不小心输掉了&nbsp;5&nbsp;积分
              <br />
            </div>
          </div>
          <div class="gamemsg_zone">
            <div class="gamemsg_title">玩家动态</div>
            <div class="overflow-hidden">
              <div class="gamemsg_content">
                张三刚刚又赚到了&nbsp;20&nbsp;积分
                <br />
                李四刚刚又赚到了&nbsp;20&nbsp;积分
                <br />
                李四刚刚又赚到了&nbsp;30&nbsp;积分
                <br />
                李四刚刚又赚到了&nbsp;74&nbsp;积分
                <br />
                李四刚刚又赚到了&nbsp;20&nbsp;积分
                <br />
                李四刚刚又赚到了&nbsp;84&nbsp;积分
                <br />
                李四刚刚又赚到了&nbsp;40&nbsp;积分
                <br />
                李四刚刚又赚到了&nbsp;40&nbsp;积分
                <br />
                王五刚刚又赚到了&nbsp;15&nbsp;积分
                <br />
                王五刚刚又赚到了&nbsp;15&nbsp;积分
                <br />
                王五刚刚又赚到了&nbsp;60&nbsp;积分
                <br />
                赵六刚刚又赚到了&nbsp;96&nbsp;积分
                <br />
                赵六刚刚又赚到了&nbsp;40&nbsp;积分
                <br />
                赵六刚刚又赚到了&nbsp;10&nbsp;积分
                <br />
                赵六刚刚又赚到了&nbsp;10&nbsp;积分
                <br />
                赵六刚刚又赚到了&nbsp;10&nbsp;积分
                <br />
                赵六刚刚又赚到了&nbsp;10&nbsp;积分
                <br />
                赵六刚刚又赚到了&nbsp;10&nbsp;积分
                <br />
                赵六刚刚又赚到了&nbsp;10&nbsp;积分
                <br />
                赵六刚刚又赚到了&nbsp;10&nbsp;积分
                <br />
              </div>
            </div>
          </div>
          <div :class="['gamemsg_zone', 'h-130px']">
            <div class="gamemsg_title">当前选择</div>
            <div class="userselect">
              <ul id="showNowChoose">
                <li v-for="fruit in selectedFruits">
                  <img :src="getImage(fruit.i + 1)" />*&nbsp;{{ fruit.count }}
                </li>
              </ul>
            </div>
            <div :class="['userhandle', 'flex', 'justify-between']">
              <a class="cursor-pointer ml-[10px]" id="once" onclick="getUp()"
                >重复上次</a
              >
              <a
                class="cursor-pointer mr-[10px]"
                @click="scores = new Array(8).fill(0)"
                >清空选择</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="gamecontrol">
        <div class="gamecontrol_zone">
          <div
            v-for="i in 8"
            :class="['gamecontrol_zone_score', 'cursor-pointer']"
          >
            <div class="gamecontrol_zone_score1">
              <span id="1Count">{{ scores[i - 1] }}</span>
            </div>
            <div class="gamecontrol_zone_score2">
              <a>
                <img
                  :src="`/_nuxt/public/img/img${i}.png`"
                  @click="handleFruitButton(i - 1)"
                />
              </a>
            </div>
          </div>

          <div class="gamecontrol_zone_button">
            <div class="cursor-pointer" @click="handleStart">
              <img src="@/public/img/img9.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gamebottom">
      <img src="@/public/img/20150116200049765.jpg" />
    </div>

    <div v-show="isWarning" class="fullscreen-warning">
      <video ref="videoPlayer" autoplay loop muted playsinline>
        <source src="@/public/family.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<style scoped>
  .fullscreen-warning {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle,
      rgba(255, 0, 0, 0.2) 0%,
      rgba(255, 0, 0, 0.6) 60%,
      rgba(255, 0, 0, 0.8) 100%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: flash 0.4s infinite;
  }

  @keyframes flash {
    0% {
      background: radial-gradient(
        circle,
        rgba(255, 0, 0, 0.1) 0%,
        rgba(255, 0, 0, 0.2) 70%,
        rgba(255, 0, 0, 0.5) 100%
      );
    }
    50% {
      background: radial-gradient(
        circle,
        rgba(255, 0, 0, 0.1) 0%,
        rgba(255, 0, 0, 0.2) 70%,
        rgba(255, 0, 0, 5) 100%
      );
    }
    100% {
      background: radial-gradient(
        circle,
        rgba(255, 0, 0, 0.1) 0%,
        rgba(255, 0, 0, 0.2) 70%,
        rgba(255, 0, 0, 0.5) 100%
      );
    }
  }

  video {
    object-fit: cover;
    opacity: 0.2;
    pointer-events: none;
  }
</style>
