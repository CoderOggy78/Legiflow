export interface LegalCase {
  id: string;
  title: string;
  status: 'Open' | 'Closed' | 'Pending';
  lastActivity: string; // ISO date string
  nextHearing?: string; // ISO date string
}

export interface LegalDocument {
  id: string;
  name: string;
  dateUploaded: string;
}

export const mockCases: LegalCase[] = [
  {
    id: "CAS-1001",
    title: "Smith vs. TechCorp (NDA Breach)",
    status: "Open",
    lastActivity: "2026-04-10T10:00:00Z",
    nextHearing: "2026-04-20T09:30:00Z",
  },
  {
    id: "CAS-1002",
    title: "Global Supply Co. Merger",
    status: "Pending",
    lastActivity: "2026-04-14T14:20:00Z",
  },
  {
    id: "CAS-1003",
    title: "Doe Employment Dispute",
    status: "Closed",
    lastActivity: "2025-11-05T16:45:00Z",
  },
  {
    id: "CAS-1004",
    title: "Intellectual Property - DesignCorp",
    status: "Open",
    lastActivity: "2026-04-01T09:00:00Z",
    nextHearing: "2026-04-18T14:00:00Z",
  }
];

export const mockDocuments: LegalDocument[] = [
  {
    id: "DOC-201",
    name: "TechCorp_NDA_Signed.pdf",
    dateUploaded: "2026-04-12T11:00:00Z",
  },
  {
    id: "DOC-202",
    name: "Merger_Agreement_Draft_v2.docx",
    dateUploaded: "2026-04-15T08:30:00Z",
  },
  {
    id: "DOC-203",
    name: "DesignCorp_Patent_Application.pdf",
    dateUploaded: "2026-03-28T15:15:00Z",
  }
];
