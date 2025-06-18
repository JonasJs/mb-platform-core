export class RegistrationRepositoryForm {
  #FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLScVTPxYM1-DtdS7EV6Q9A7njRg5vhC3PF-NtuJzbiI6CHLxxg/formResponse'

  async createUser(data) {
    const formData = new URLSearchParams()

    formData.append('entry.1087319197', data?.email || '')
    formData.append('entry.10116316', data?.personType || '')
    formData.append('entry.1680535020', data?.phone || '')
    formData.append('entry.1332728990', data?.password || '')
    formData.append('entry.699974024', data?.companyName || '')
    formData.append('entry.1677536373', data?.cnpj || '')
    formData.append('entry.305106335', data?.openingDate || '')
    formData.append('entry.1777546314', data?.name || '')
    formData.append('entry.534512218', data?.cpf || '')
    formData.append('entry.1426413035', data?.birthDate || '')

    await fetch(this.#FORM_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }
}
