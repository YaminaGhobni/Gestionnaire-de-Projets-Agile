import React, { useCallback } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
import './_UploadImage.scss';
const UploadImage = ({ setUploadedPicture }) => {
  const handleChange = useCallback(
    (info) => {
      if (info.file.status === 'done') {
        setUploadedPicture(info?.file?.originFileObj);
      }
    },
    [setUploadedPicture]
  );

  return (
    <Space
      direction="vertical"
      style={{ width: '100%' }}
      size="large"
      className="upload_image_section"
    >
      <Upload
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture"
        maxCount={1}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}></Button>
      </Upload>
    </Space>
  );
};

export default UploadImage;
