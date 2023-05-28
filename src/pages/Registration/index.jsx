import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthRegister, selectIsAuth } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.scss';

export const Registration = () => {

  const isAuth = useSelector(selectIsAuth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    mode: 'onChange'
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuthRegister(values))
    if (!data.payload) {
      return alert('не зарєєстрованно!')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }


  if (isAuth) {
    navigate("/")
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField className={styles.field} label="Полное имя" fullWidth error={Boolean(errors.name?.message)} helperText={errors.name?.message}  {...register("name", { required: 'введіть імя' })} />


        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register("email", { required: 'введіть почту' })}
        />

        <TextField className={styles.field} label="Пароль"  {...register("password", { required: 'введіть пароль' })} error={Boolean(errors.password?.message)} fullWidth helperText={errors.password?.message} />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
