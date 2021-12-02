import Input from './Input.svelte';
import Select from './Select.svelte';
import Radio from './Radio.svelte';
import Checkbox from './Checkbox.svelte';
import Switch from './Switch.svelte';
import Slider from './Slider.svelte';
import Form from './Form.svelte';

export type InputType = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'time' | 'date' | 'month' | 'week' | 'datetime-local' | 'color' | 'textarea';

export {
  Input,
  Select,
  Radio,
  Checkbox,
  Switch,
  Slider,
  Form,
};
