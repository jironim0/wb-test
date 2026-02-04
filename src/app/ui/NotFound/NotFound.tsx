import { useNavigate } from 'react-router-dom';
import s from './NotSound.module.scss'

export function NotFound() {
    const navigate = useNavigate()


    return (
        <div className={s.notFound}>
            <div className={s.notFound__container}>
                <h1 className={s.notFound__title}>404</h1>
                <p className={s.notFound__text}>Страница не найдена</p>
                <button 
                    onClick={() => navigate('/')} 
                    className={s.notFound__link}
                >
                    Перейти на главную
                </button>
            </div>
        </div>
    );
}
