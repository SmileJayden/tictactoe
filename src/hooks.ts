import { reactive, ref, onMounted, onUnmounted } from 'vue';

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function update(e: MouseEvent) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });

  return { x, y };
}

export function useScore() {
  const score = ref(0);
  function increase(): void {
    score.value++;
  }
  function decrease(): void {
    score.value--;
  }
  return { score, increase, decrease };
}
