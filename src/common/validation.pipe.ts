import { BadRequestException } from '@nestjs/common';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {

  /**
   * This method will validate the value of a field,
   * if it is not valid it will throw a BadRequestException
   * @param value value of a field of DTO
   * @param metadata
   */
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    await this.checkForError(value, metatype);
    return value;
  }

  /**
   * Validator to check the type of metadata's type
   * @param metatype
   */
  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

  private async checkForError(value: any, metatype: any) {
    let errorMessage = '';
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      for (const index of errors) {
        // This will return a custom message from the validation decorator in the DTO
        errorMessage += `${index.constraints[Object.keys(index.constraints)[0]]}, `;
      }
      throw new BadRequestException(errorMessage);
    }
  }
}
