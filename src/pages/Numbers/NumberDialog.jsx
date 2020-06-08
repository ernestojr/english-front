import React, { useState } from 'react';
import NTW from 'number-to-words';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Button,
  Popover, PopoverHeader, PopoverBody,
  Collapse,
  CardBody, Card,
} from 'reactstrap';
import random from 'lodash/random';

function generatePractice(min, max) {
  const target = random(min, max);
  return {
    target,
    cardinal: '',
    ordinal: '',
    cardinalCorrect: NTW.toWords(target),
    ordinalCorrect: NTW.toWordsOrdinal(target),
    cardinalError: false,
    ordinalError: false,
  };
}

export default (props) => {
  const {
    isOpen,
    toggle,
  } = props;
  const [between, setBetween] = useState({ min: 0, max: 100});
  const [state, setNumber] = useState(generatePractice(between.min, between.max));
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const onClickSetting = () => setSettingOpen(!settingOpen);
  const onChange = key => event => {
    const { value } = event.target;
    const newState = {
      ...state,
      [`${key}Error`]: value.trim().toLowerCase() !== state[`${key}Correct`],
      [key]: value,
    };
    
    setNumber(newState);
  }
  const onClickOther = () => setNumber(generatePractice(between.min, between.max));
  const help = `${state.cardinalCorrect}/${state.ordinalCorrect}`;
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Number Practice</ModalHeader>
        <ModalBody>
          <h2 id="number" className="text-center">{state.target}</h2>
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="number"
            toggle={() => setPopoverOpen(!popoverOpen)}>
            <PopoverHeader>Help</PopoverHeader>
            <PopoverBody>{help}</PopoverBody>
          </Popover>
          <FormGroup>
            <Label for="number-cardinal">Cardinal</Label>
            <Input
              type="text"
              name="number-cardinal"
              id="number-cardinal"
              value={state.cardinal}
              invalid={state.cardinalError}
              valid={!state.cardinalError}
              onChange={onChange('cardinal')}
            />
          </FormGroup>
          <FormGroup>
            <Label for="number-ordinal">Ordinal</Label>
            <Input
              type="text"
              name="number-ordinal"
              id="number-ordinal"
              min="0"
              value={state.ordinal}
              invalid={state.ordinalError}
              valid={!state.ordinalError}
              onChange={onChange('ordinal')}
            />
          </FormGroup>
          <Collapse isOpen={settingOpen}>
            <Card>
              <CardBody>
                <FormGroup>
                  <Label for="number-min">Min Number</Label>
                  <Input
                    type="number"
                    name="number-min"
                    id="number-min"
                    value={between.min}
                    onChange={({ target: { value }}) => setBetween({ ...between, min: parseInt(value || 0, 10) })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="number-max">Max Number</Label>
                  <Input
                    type="number"
                    name="number-max"
                    id="number-max"
                    value={between.max}
                    onChange={({ target: { value }}) => setBetween({ ...between, max: parseInt(value || 0, 10) })}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Collapse>
        </ModalBody>
        <ModalFooter>
          <Button
            outline
            className="mr-2"
            color="warning"
            type="button" onClick={onClickSetting}>Setting</Button>
          <Button
            outline
            className="mr-2"
            color="secondary"
            type="button" onClick={() => {
              toggle();
              setNumber(generatePractice(between.max));
            }}>Close</Button>
          <Button
            outline
            color="primary"
            type="button"
            onClick={onClickOther}>Other</Button>
        </ModalFooter>
    </Modal>
  );
};
