import { Button } from "./Button"

import leftSvg from '../assets/left.svg'

import rightSvg from '../assets/right.svg'

type Props = {
    current: number
    total: number
    onNext: () => void
    onPrevious: () => void
}


export function Pagination({current, total, onNext, onPrevious}: Props){

    return <div className="flex flex-1 justify-center items-center gap-2">
        <Button disabled={current === 1} onClick={onPrevious} variant="iconSmall">
            <img src={leftSvg} alt="Ícone de voltar" />
        </Button>
        <span className="tex-sm text-gray-200">
            {current}/{total}
        </span>

        <Button disabled={current === total} onClick={onNext} variant="iconSmall">
            <img src={rightSvg} alt="Ícone de avançar" />
        </Button>
    </div>
}