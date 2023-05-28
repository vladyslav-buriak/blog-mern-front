import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from "react";
import axios from "../../utils";

export const AddPost = () => {
  const siblingClick = useRef(null);
  const isAuth = useSelector(selectIsAuth)
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const { id } = useParams();
  const isEditor = Boolean(id);
  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setValue(data.text)
        setTitle(data.title)
        setTags(data.tags)
        setImageUrl(data.imageUrl)

      })
    }
  }, [])
  const navigate = useNavigate();

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('помилка')
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const fields = {
        text: value,
        title,
        tags,
        imageUrl
      }
      const { data } = isEditor ? (await axios.patch(`/posts/${id}`, fields))
        :
        (await axios.post('/posts', fields))
        const _id = isEditor ? id : data._id;

      navigate(`/posts/${_id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const onClickRemoveImage = () => {

    setImageUrl("")
  };

  const onChange = React.useCallback((value) => {
    setValue(value)
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!isAuth) {
    return navigate("/")

  }

  return (
    <Paper style={{ padding: 30 }}>
      <form action="">

        <Button variant="outlined" size="large" onClick={() => { siblingClick.current.click() }}>
          Загрузить превью
        </Button>
        <input ref={siblingClick} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
        )}
        {imageUrl && (
          <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          fullWidth
          value={title}
          onChange={(e) => { setTitle(e.currentTarget.value) }}
        />
        <TextField classes={{ root: styles.tags }} value={tags} variant="standard" placeholder="Тэги" fullWidth onChange={(e) => { setTags(e.currentTarget.value) }} />
        <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
            {isEditor ? "Сохранить" : "Опубликовать"}
          </Button>
          <a href="/">
            <Button size="large">Отмена</Button>
          </a>
        </div>
      </form>

    </Paper>
  );
};
