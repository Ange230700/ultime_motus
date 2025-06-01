<!-- pages\index.vue -->

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md rounded-2xl shadow-md p-6">
      <h1 class="text-2xl font-bold mb-4 text-center">Motus Game</h1>
      <div v-if="!won">
        <div class="mb-4">
          <label for="wordInput" class="block mb-1">Enter a word:</label>
          <InputText
            id="wordInput"
            v-model="wordInput"
            class="w-full"
            @keyup.enter="onTry"
          />
        </div>
        <Button label="Try" class="w-full mb-4" @click="onTry" />
      </div>
      <div v-if="showHints">
        <div class="mb-2">
          The word tried is: <strong>{{ lastTriedWord }}</strong>
        </div>
        <div class="mb-2">
          Letters well placed:
          <strong>{{ lettersWellPlaced.join(", ") }}</strong>
        </div>
        <div class="mb-2">
          Misplaced letters: <strong>{{ lettersMisplaced.join(", ") }}</strong>
        </div>
        <div class="mb-4">
          Letters not in word:
          <strong>{{ lettersNotInWord.join(", ") }}</strong>
        </div>
      </div>
      <div v-if="won" class="text-center">
        <h2 class="text-xl font-semibold mb-2">You won!</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
/**
 * Add a multi-word component name here. ESLint will no longer complain
 * about “Component name 'index' should always be multi-word.”
 */
defineOptions({
  name: "MotusGame",
});

const wordInput = ref("");
const lastTriedWord = ref("");
const lettersWellPlaced = ref<string[]>([]);
const lettersMisplaced = ref<string[]>([]);
const lettersNotInWord = ref<string[]>([]);
const showHints = ref(false);
const won = ref(false);

const wordToGuess = "dictionnaire";

function checkIfUserHasFoundRightWord(
  submitted: string,
  target: string,
): boolean {
  return (
    typeof target === "string" &&
    typeof submitted === typeof target &&
    target.length === submitted.length &&
    submitted.toLowerCase() === target.toLowerCase()
  );
}

function buildFrequencyMap(target: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const char of target.toLowerCase()) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

function identifyWellPlaced(
  arr: string[],
  submitted: string,
  freq: Record<string, number>,
  target: string,
) {
  const submittedLower = submitted.toLowerCase();
  const targetLower = target.toLowerCase();
  for (let i = 0; i < submittedLower.length; i++) {
    if (submittedLower[i] === targetLower[i]) {
      arr.push(submittedLower[i]);
      freq[submittedLower[i]] = freq[submittedLower[i]] - 1;
    }
  }
}

function identifyMisplaced(
  arr: string[],
  submitted: string,
  freq: Record<string, number>,
  target: string,
) {
  const submittedLower = submitted.toLowerCase();
  const targetLower = target.toLowerCase();
  for (let i = 0; i < submittedLower.length; i++) {
    if (
      submittedLower[i] !== targetLower[i] &&
      freq[submittedLower[i]] &&
      freq[submittedLower[i]] > 0
    ) {
      arr.push(submittedLower[i]);
      freq[submittedLower[i]] = freq[submittedLower[i]] - 1;
    }
  }
}

function identifyNotInWord(
  arr: string[],
  submitted: string,
  freq: Record<string, number>,
  target: string,
) {
  const submittedLower = submitted.toLowerCase();
  const targetLower = target.toLowerCase();
  for (let i = 0; i < submittedLower.length; i++) {
    if (
      submittedLower[i] !== targetLower[i] &&
      (!freq[submittedLower[i]] || freq[submittedLower[i]] <= 0)
    ) {
      arr.push(submittedLower[i]);
    }
  }
}

function tryWord(submitted: string, target: string) {
  const result = {
    wellPlaced: [] as string[],
    misplaced: [] as string[],
    notInWord: [] as string[],
  };

  if (checkIfUserHasFoundRightWord(submitted, target)) {
    result.wellPlaced = submitted.toLowerCase().split("");
    return result;
  }

  const freq = buildFrequencyMap(target);
  identifyWellPlaced(result.wellPlaced, submitted, freq, target);
  identifyMisplaced(result.misplaced, submitted, freq, target);
  identifyNotInWord(result.notInWord, submitted, freq, target);

  return result;
}

function onTry() {
  if (!wordInput.value) return;
  const submitted = wordInput.value;
  lastTriedWord.value = submitted;
  wordInput.value = "";
  const { wellPlaced, misplaced, notInWord } = tryWord(submitted, wordToGuess);
  lettersWellPlaced.value = wellPlaced;
  lettersMisplaced.value = misplaced;
  lettersNotInWord.value = notInWord;
  showHints.value = true;
  if (checkIfUserHasFoundRightWord(submitted, wordToGuess)) {
    won.value = true;
  }
}
</script>

<style scoped>
/* Add any additional Tailwind or custom styles here */
</style>
