import { Select } from 'antd';
import './_AntSelect.scss';
const AntSelect = ({ options, onChange, placeholder, label, defaultValue }) => (
  <div className="select_antd">
    <label className="label" htmlFor="select">
      {label ? label : 'select a book'}
    </label>
    <Select
      className="ant_select"
      showSearch
      allowClear
      style={{ width: 200 }}
      placeholder={placeholder || 'Select Book'}
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={options}
      size="large"
      onChange={onChange}
      defaultValue={defaultValue}
    />
  </div>
);

export default AntSelect;
