import useReactLocalStorage from 'use-local-storage';

function useLocalStorage() {
  const [step, setStep] = useReactLocalStorage('step', '')

  return {
    step,
    setStep
  }
}

export default useLocalStorage