import React, { useRef, useState } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { fetchComment } from "../../redux/slices/comments";
import { useDispatch } from "react-redux";
import axios from "../../utils";


export const Index = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const inpRef = useRef();

  const onSubmit = async (value) => {

    try {
      setIsLoading(true)
     const {data} = await axios.post("/comments", value)
  console.log(data)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className={styles.root}>

        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />

        <form onSubmit={handleSubmit(onSubmit)} action="" >
          <div className={styles.form}>

            <TextField
              label="Написать комментарий"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
              ref={inpRef}
              {...register("text", { required: true })}

            />
            <Button loading={true} type="submit" variant="contained">Отправить</Button>


          </div>
        </form>

      </div>
    </>
  );
};
