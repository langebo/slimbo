import * as React from 'react';
import styled from 'styled-components';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import {
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react/lib/Button';
import { createMeasurement } from '../../api/client';
import { IMeasurement } from '../../types/models';

export interface ICreateMeasureProps {
  onCreated: (m: IMeasurement) => void;
  onClose: () => void;
}

const CreateMeasure: React.FC<ICreateMeasureProps> = ({
  onClose,
  onCreated,
}) => {
  const [weight, setWeight] = React.useState<number>(0);

  const onSave = () => {
    if (weight) {
      createMeasurement({ weight })
        .then((m) => onCreated(m))
        .then(() => onClose());
    }
  };

  const onValidate = (value: string) => {
    if (!isNaN(Number(value))) {
      setWeight(Number(value));
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isNaN(Number(event.target.value))) {
      setWeight(Number(event.target.value));
    }
  };

  return (
    <Container>
      <Label required={true}>Weight</Label>
      <SpinButton
        inputProps={{ inputMode: 'decimal' }}
        value={weight.toString()}
        min={0.0}
        max={180.0}
        step={1.0}
        onValidate={onValidate}
        onBlur={onBlur}
        onIncrement={() => setWeight((prev) => prev + 1)}
        onDecrement={() => setWeight((prev) => prev - 1)}
      />
      <DialogFooter>
        <PrimaryButton
          disabled={weight === undefined}
          onClick={onSave}
          text='Create'
        />
        <DefaultButton onClick={onClose} text='Cancel' />
      </DialogFooter>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CreateMeasure;
