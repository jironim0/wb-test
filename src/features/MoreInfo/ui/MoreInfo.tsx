import { useNavigate, useParams } from 'react-router-dom';
import s from './MoreInfo.module.scss';
import { useFetchUserByIdQuery } from '../api/usersDetailsApi';
import { MyButton } from '@/shared/ui/MyButton';

export function MoreInfo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading } = useFetchUserByIdQuery(id ?? '', {
    skip: !id,
  });

  if (isLoading) return <div className={s.loader}>Loading...</div>;
  if (!user) return <div className={s.error}>User not found</div>;

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <header className={s.header}>
          <img src={user.image} alt={user.username} className={s.avatar} />
          <div className={s.mainInfo}>
            <h1>{user.firstName} {user.lastName}</h1>
            <span className={s.roleTag}>{user.role}</span>
            <p className={s.username}>@{user.username}</p>
          </div>
        </header>

        <div className={s.infoGrid}>
          <section className={s.section}>
            <h3>Personal Info</h3>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Birth Date:</strong> {user.birthDate}</p>
            <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          </section>

          <section className={s.section}>
            <h3>Contacts</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address.address}, {user.address.city}</p>
          </section>

          <section className={s.section}>
            <h3>Education & Work</h3>
            <p><strong>University:</strong> {user.university}</p>
            <p><strong>Company:</strong> {user.company?.name}</p>
            <p><strong>Position:</strong> {user.company?.title}</p>
          </section>

          <section className={s.section}>
            <h3>Physical Specs</h3>
            <p><strong>Height:</strong> {user.height} cm</p>
            <p><strong>Weight:</strong> {user.weight} kg</p>
            <p><strong>Eye Color:</strong> {user.eyeColor}</p>
            <p><strong>Hair:</strong> {user.hair?.color} ({user.hair?.type})</p>
          </section>
        </div>
        <div className={s.btn__group}>
          <MyButton onClick={() => navigate(-1)}>Back</MyButton>
        </div>

      </div>
    </div>
  );
}
