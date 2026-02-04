import s from './NotSound.module.scss'

export function NotFound() {
    return (
        <div className={s.notFound}>
            <div className={s.notFound__container}>
                <h1 className={s.notFound__title}>404</h1>
                <p className={s.notFound__text}>Страница не найдена</p>
                <a href="/" className={s.notFound__link}>
                    Перейти на главную
                </a>
            </div>
        </div>
    );
}
