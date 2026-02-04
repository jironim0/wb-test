import { useState } from 'react'
import { useFecthUsersQuery } from '../api/userApi'
import { Link, useSearchParams } from 'react-router-dom'
import s from './MainPage.module.scss'
import { Modal } from '@/widgets/Modal/ui/Modal'
import { MyButton } from '@/shared/ui/MyButton'
import type { User } from '../api/userApi.type'

export function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  const limit = 10
  const { data, isLoading } = useFecthUsersQuery({
    limit: limit,
    skip: (currentPage - 1) * limit 
  })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState(0)
  const handleOpen = (user: User) => {
    setIsModalOpen(true)
    setCurrentUser(user.id)
  }

  if (isLoading) return <div>LOADING...</div>
  if (!data) return <div>Fetch Error</div>

  const totalPages = Math.ceil(data.total / limit)

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <h1>Управление пользователями</h1>
        <MyButton className={s.createButton} onClick={() => setIsModalOpen(true)}>
          Добавить пользователя
        </MyButton>
      </header>

      <div className={s.tableContainer}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Фото</th>
              <th>Полное имя</th>
              <th>Email</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.image} alt="avatar" className={s.avatar} />
                </td>
                <td>
                  <Link to={`/users/${user.id}`} className={s.userLink}>
                    {user.firstName} {user.lastName}
                  </Link>
                </td>
                <td>{user.email || 'example@mail.com'}</td>
                <td>
                  <MyButton 
                    className={s.editButton} 
                    onClick={() => handleOpen(user)}
                  >
                    Редактировать
                  </MyButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={s.paginator}>
        <MyButton disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Назад</MyButton>
        <span>Страница {currentPage} из {totalPages}</span>
        <MyButton disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Вперед</MyButton>
      </div>

      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setCurrentUser(0);
          }} 
          user={currentUser ? data.users.find(el => el.id === currentUser) : undefined}
        />
      )}
    </div>
  )
}
