export class Don {
    id!: number
    typeDon!: string
    montantDon!: number
    civiliteDon!: string
    nomDon!: string
    prenomDon!: string
    contactDon!: string
    paysDon!: string
    villeDon!: string
    organisationDon!: string
    estAnonyme!: number
    estOrganisation!: number
    created_at!: string
    updated_at!: string
}

export class DataDon {
    status!: string
    status_code!: number
    status_message!: string
    current_page!: string
    last_page!: number
    dons!: Don[]
  }
  