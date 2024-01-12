import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import AntSelect from '../../components/AntSelect/AntSelect';
import { createUser, updateUser } from '../../../../my-store/slices/users-rolesSlice';
import { useDispatch } from 'react-redux';
import './_AddUser.scss';
const initialValues = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  phoneNumber: '',
  role: '',
  password: '',
};

const AddUser = ({ id, open, handleClose, isEdit, user }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    formik.resetForm();
    handleClose(id);
  };
  const formik = useFormik({
    initialValues,
    validationSchema: !isEdit
      ? Yup.object().shape({
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          userName: Yup.string().required(),
          email: Yup.string().email().required(),
          phoneNumber: Yup.number().required(),
          password: Yup.string().required(),
          confirm_password: Yup.string()
            .oneOf([Yup.ref('password')])
            .required(),
        })
      : Yup.object().shape({
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          userName: Yup.string().required(),
          email: Yup.string().email().required(),
          phoneNumber: Yup.number().required(),
          password: Yup.string(),
          confirm_password: Yup.string().oneOf([Yup.ref('password')]),
        }),
    onSubmit: async (values) => {
      delete values.confirm_password;
      values.phoneNumber = `${values.phoneNumber}`;

      if (!isEdit) {
        dispatch(createUser(values))
          .unwrap()
          .then((res) => {
            handleClose(id);
            message.success('User Created Successfully');
          })
          .catch((err) => {
            message.error(err.message);
          });
      } else {
        //edit user
        values.phoneNumber = `${values.phoneNumber}`;
        dispatch(updateUser({ values, id: user._id }))
          .unwrap()
          .then((_res) => {
            handleClose(id);
            message.success('User Updated Successfully');
          })
          .catch((err) => {
            message.error(err.message);
          });
      }
    },
  });

  const hendleRole = (id) => {};

  useEffect(() => {
    if (isEdit) {
      formik.setFieldValue('userName', user.userName);
      formik.setFieldValue('firstName', user.firstName);
      formik.setFieldValue('lastName', user.lastName);
      formik.setFieldValue('email', user.email);
      formik.setFieldValue('phoneNumber', user.phoneNumber);
      formik.setFieldValue('role', user.roles[0]);
    }
  }, [isEdit]);

  let roles = [
    { label: 'ADMIN', id: '659fc0a4ffce71a158f125ed' },
    { label: 'USER', id: '659fc0a4ffce71a158f125f0' },
  ];

  return (
    <>
      <Modal
        title={isEdit ? 'Edit User' : 'Add New User'}
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <form action="" onSubmit={formik.handleSubmit} className="form-user">
          <Input
            name="userName"
            formik={formik}
            variant="secondary"
            placeholder={'User name'}
            label={'User name'}
            required={true}
          />
          <Input
            name="firstName"
            formik={formik}
            variant="secondary"
            placeholder={'First name'}
            label={'First name'}
            required={true}
          />
          <Input
            name="lastName"
            formik={formik}
            variant="secondary"
            placeholder={'Last name'}
            label={'Last name'}
            type="text"
            required={true}
          />
          <Input
            name="email"
            formik={formik}
            variant="secondary"
            placeholder={'Email'}
            label={'Email'}
            type="email"
            required={true}
          />
          <Input
            name="phoneNumber"
            formik={formik}
            variant="secondary"
            placeholder={'Phone Number'}
            label={'Phone Number'}
            type="number"
            required={true}
          />
          <Input
            name="password"
            formik={formik}
            variant="secondary"
            placeholder={'Password'}
            label={'Password'}
            type="password"
            required={true}
          />
          <Input
            name="confirm_password"
            formik={formik}
            variant="secondary"
            placeholder={'Confirm Password'}
            label={'Confirm Password'}
            type="password"
            required={true}
          />
          <AntSelect
            options={roles?.map((el) => ({
              label: el.label,
              value: el.id,
            }))}
            onChange={(id) => {
              let role = roles.find((role) => role.id === id);
              formik.setFieldValue('role', role.label);
            }}
            placeholder="Select a role"
            label="Select a Role"
            defaultValue={formik.values.role}
          />
          <Button label={isEdit ? 'Edit User' : 'Add User'} type={'submit'} />
        </form>
      </Modal>
    </>
  );
};

export default AddUser;
