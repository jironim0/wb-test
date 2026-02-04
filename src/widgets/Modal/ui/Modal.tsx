import { createPortal } from "react-dom";
import { useFormik, getIn } from "formik";
import { UserSchema } from "../model/validationSchema";
import { MyInput } from "@/shared/ui/MyInput";
import s from "./Modal.module.scss";
import type { User } from "@/app/ui/MainPage/api/userApi.type";
import { useCreateUserMutation, useUpdateUserMutation } from "../api/changeUserApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null
}

export const Modal = ({ isOpen, onClose, user }: ModalProps) => {
    const [updateUser] = useUpdateUserMutation()
    const [createUser] = useCreateUserMutation()
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || "",
      age: user?.age || 18, 
      password: user?.password || "defaultPassword123", 
      phone: user?.phone || "",
      birthDate: user?.birthDate || "1990-01-01",
      height: user?.height || 170,
      weight: user?.weight || 70,
      eyeColor: user?.eyeColor || "brown",
      bloodGroup: user?.bloodGroup || "A+",
      gender: user?.gender || "male",
      hair: { 
        color: user?.hair?.color || "black",
        type: user?.hair?.type || "straight"
      },
      address: { 
        address: user?.address?.address || "", 
        city: user?.address?.city || "", 
        state: user?.address?.state || "Московская область",
        postalCode: user?.address?.postalCode || "101000"
      },
      university: user?.university || "МГУ",
      company: { 
        name: user?.company?.name || "Default Company",
        title: user?.company?.title || "Developer",
        department: user?.company?.department || "IT"
      },
      bank: { 
        cardNumber: user?.bank?.cardNumber || "", 
        cardExpire: user?.bank?.cardExpire || "12/30",
        currency: user?.bank?.currency || "USD",
        iban: user?.bank?.iban || "" 
      },
      crypto: { 
        coin: user?.crypto?.coin || "Bitcoin",
        wallet: user?.crypto?.wallet || "", 
        network: user?.crypto?.network || "Bitcoin"
      },
      role: user?.role || "user"
    },
  enableReinitialize: true,
  validationSchema: UserSchema,
  validateOnMount: false,
    onSubmit: (values) => {
      console.log("CLICKED")
      if (user) {
        updateUser({ id: user.id, ...values })
      } else {
        createUser(values)
      }
      onClose();
    },
  });
  if (!isOpen) return null;

  const renderError = (fieldName: string) => {
    const error = getIn(formik.errors, fieldName);
    const touched = getIn(formik.touched, fieldName);
    return touched && error ? <span className={s.error}>{error}</span> : null;
  };

  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return createPortal(
    <div className={s.overlay} onClick={onClose}>
      <form className={s.content} onClick={(e) => e.stopPropagation()} onSubmit={formik.handleSubmit}>
        <div className={s.scrollableArea}>
          <h2>Полное редактирование</h2>
          
          <div className={s.gridContainer}>
            <h3 className={s.fullWidth}>Основное</h3>
            <div>
                <MyInput label="Имя" {...formik.getFieldProps('firstName')} />
                {renderError('firstName')}
            </div>
            <div>
                <MyInput label="Фамилия" {...formik.getFieldProps('lastName')} />
                {renderError('lastName')}
            </div>
            <div>
                <MyInput label="Username" {...formik.getFieldProps('username')} />
                {renderError('username')}
            </div>
            <div>
                <MyInput label="Email" {...formik.getFieldProps('email')} />
                {renderError('email')}
            </div>
            <div>
                <MyInput label="Телефон" {...formik.getFieldProps('phone')} />
                {renderError('phone')}
            </div>
            <div>
                <MyInput label="Возраст" type="number" {...formik.getFieldProps('age')} />
                {renderError('age')}
            </div>
            <input
              type="hidden"
              {...formik.getFieldProps('gender')}
              value={user?.gender || "male"}
            />

            <h3 className={s.fullWidth}>Внешность</h3>
            <div>
                <MyInput label="Цвет волос" {...formik.getFieldProps('hair.color')} />
                {renderError('hair.color')}
            </div>
            <div>
                <MyInput label="Тип волос" {...formik.getFieldProps('hair.type')} />
                {renderError('hair.type')}
            </div>
            <div>
                <MyInput label="Группа крови" {...formik.getFieldProps('bloodGroup')} />
                {renderError('bloodGroup')}
            </div>

            <h3 className={s.fullWidth}>Адрес</h3>
            <div>
                <MyInput label="Город" {...formik.getFieldProps('address.city')} />
                {renderError('address.city')}
            </div>
            <div>
                <MyInput label="Улица" {...formik.getFieldProps('address.address')} />
                {renderError('address.address')}
            </div>

            <h3 className={s.fullWidth}>Финансы</h3>
            <div>
                <MyInput label="Номер карты" {...formik.getFieldProps('bank.cardNumber')} />
                {renderError('bank.cardNumber')}
            </div>
            <div>
                <MyInput label="IBAN" {...formik.getFieldProps('bank.iban')} />
                {renderError('bank.iban')}
            </div>

            <h3 className={s.fullWidth}>Крипто</h3>
            <div>
                <MyInput label="Кошелек" {...formik.getFieldProps('crypto.wallet')} />
                {renderError('crypto.wallet')}
            </div>
          </div>
        </div>

        <div className={s.actions}>
          <button type="button" className={s.cancelBtn} onClick={onClose}>Отмена</button>
          <button type="submit" className={s.submitBtn} 
          disabled={!formik.isValid}
          >
            Сохранить всё
          </button>
        </div>
      </form>
    </div>,
    modalRoot
  );
};
