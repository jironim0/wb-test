import { Route, Routes } from 'react-router-dom'
import { MainPage } from '../ui/MainPage/ui/MainPage'
import { MoreInfo } from '../../features/MoreInfo/ui/MoreInfo'
import { NotFound } from '../ui/NotFound'

export const Path = {
    Main: '/',
    MoreInfo: '/users/:id',
    NotFound: '*'
}

export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<MainPage/>}/>
        <Route path={Path.MoreInfo} element={<MoreInfo/>}/>
        <Route path={Path.NotFound} element={<NotFound/>}/>
    </Routes>)
