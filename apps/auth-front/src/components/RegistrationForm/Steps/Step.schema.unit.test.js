import { validateSchema } from '@mb-platform/form-guard'
import { describe, expect, it } from 'vitest'
import { PERSON_TYPE_ENUM } from '../RegistrationForm.utils.js'
import {
  companyStepSchema,
  individualStepSchema,
  passwordStepSchema,
  welcomeSchema,
} from './Step.schema'

describe('StepSchemas', () => {
  describe('welcomeSchema', () => {
    it('should show success with valid email and personType', () => {
      const data = {
        email: 'jonas@email.com',
        personType: PERSON_TYPE_ENUM.INDIVIDUAL,
      }

      const result = validateSchema({
        schema: welcomeSchema,
        data,
      })
      expect(result.success).toBe(true)
    })

    it('should show error when email is empty', () => {
      const data = {
        email: '',
        personType: PERSON_TYPE_ENUM.INDIVIDUAL,
      }
      const result = validateSchema({
        schema: welcomeSchema,
        data,
      })

      expect(result.success).toBe(false)
      expect(result.errors.email).toBe('e-mail inválido!')
    })

    it('should show sucess with valid email and personType', () => {
      const data = {
        email: 'jonas@email.com',
        personType: PERSON_TYPE_ENUM.INDIVIDUAL,
      }
      const result = validateSchema({
        schema: welcomeSchema,
        data,
      })

      expect(result.success).toBe(true)
    })

    describe('individualStepSchema', () => {
      it('should return errors when inputs is empty', () => {
        const result = validateSchema({
          schema: individualStepSchema,
          data: {},
        })

        expect(result.success).toBe(false)
        expect(result.errors.name).toBe('name is required.')
        expect(result.errors.cpf).toBe('cpf is required.')
        expect(result.errors.birthDate).toBe('birthDate is required.')
        expect(result.errors.phone).toBe('phone is required.')
      })

      it('should show sucess with valid data', () => {
        const data = {
          name: 'Jonas',
          cpf: '123.456.789-09',
          birthDate: '01/01/1990',
          phone: '(21) 99999-9999',
        }
        const result = validateSchema({
          schema: individualStepSchema,
          data,
        })

        expect(result.success).toBe(true)
      })
    })

    describe('companyStepSchema', () => {
      it('should show error when email is empty', () => {
        const result = validateSchema({
          schema: companyStepSchema,
          data: {},
        })
        expect(result.success).toBe(false)
        expect(result.errors.companyName).toBe('companyName is required.')
        expect(result.errors.cnpj).toBe('cnpj is required.')
        expect(result.errors.openingDate).toBe('openingDate is required.')
      })

      it('should show sucess with valid data', () => {
        const data = {
          companyName: 'Empresa Ltda',
          cnpj: '12.345.678/0001-99',
          openingDate: '16/06/1999',
        }
        const result = validateSchema({
          schema: companyStepSchema,
          data,
        })

        expect(result.success).toBe(true)
      })

      describe('passwordStepSchema', () => {
        it('should show error when password is empty', () => {
          const result = validateSchema({
            schema: passwordStepSchema,
            data: { password: '' },
          })

          expect(result.success).toBe(false)
          expect(result.errors.password).toBe('Senha obrigatória!')
        })

        it('should show sucess with valid password', () => {
          const result = validateSchema({
            schema: passwordStepSchema,
            data: { password: 'senha123' },
          })

          expect(result.success).toBe(true)
        })
      })
    })
  })
})
