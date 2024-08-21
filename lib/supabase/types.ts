export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ai_configurations: {
        Row: {
          ai_token_id: string
          created_at: string
          creator_id: string
          id: number
          is_global: boolean | null
          model: string
          provider: string
          updated_at: string | null
        }
        Insert: {
          ai_token_id: string
          created_at?: string
          creator_id: string
          id?: number
          is_global?: boolean | null
          model: string
          provider: string
          updated_at?: string | null
        }
        Update: {
          ai_token_id?: string
          created_at?: string
          creator_id?: string
          id?: number
          is_global?: boolean | null
          model?: string
          provider?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'ai_configurations_creator_id_fkey'
            columns: ['creator_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      ai_tokens: {
        Row: {
          created_at: string
          hashed_key: string
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          hashed_key: string
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          hashed_key?: string
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      direct_messages: {
        Row: {
          created_at: string
          id: number
          message: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'direct_messages_receiver_id_fkey'
            columns: ['receiver_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'direct_messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      discussion_messages: {
        Row: {
          created_at: string
          id: number
          message: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'discussion_messages_receiver_id_fkey'
            columns: ['receiver_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'discussion_messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      inboxes: {
        Row: {
          created_at: string
          id: number
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'inboxes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database['public']['Enums']['app_permission']
          role: Database['public']['Enums']['app_role']
        }
        Insert: {
          id?: number
          permission: Database['public']['Enums']['app_permission']
          role: Database['public']['Enums']['app_role']
        }
        Update: {
          id?: number
          permission?: Database['public']['Enums']['app_permission']
          role?: Database['public']['Enums']['app_role']
        }
        Relationships: []
      }
      ticket_priorities: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ticket_resolutions: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ticket_statuses: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          id: number
          priority_id: number
          resolution_id: number
          responsible_id: string
          slug: string
          status_id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          id?: number
          priority_id: number
          resolution_id: number
          responsible_id: string
          slug: string
          status_id: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: number
          priority_id?: number
          resolution_id?: number
          responsible_id?: string
          slug?: string
          status_id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'tickets_creator_id_fkey'
            columns: ['creator_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tickets_priority_id_fkey'
            columns: ['priority_id']
            isOneToOne: false
            referencedRelation: 'ticket_priorities'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tickets_resolution_id_fkey'
            columns: ['resolution_id']
            isOneToOne: false
            referencedRelation: 'ticket_resolutions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tickets_responsible_id_fkey'
            columns: ['responsible_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tickets_status_id_fkey'
            columns: ['status_id']
            isOneToOne: false
            referencedRelation: 'ticket_statuses'
            referencedColumns: ['id']
          }
        ]
      }
      user_roles: {
        Row: {
          id: number
          role: Database['public']['Enums']['app_role']
          user_id: string
        }
        Insert: {
          id?: number
          role: Database['public']['Enums']['app_role']
          user_id: string
        }
        Update: {
          id?: number
          role?: Database['public']['Enums']['app_role']
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_roles_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          status: Database['public']['Enums']['user_status'] | null
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          status?: Database['public']['Enums']['user_status'] | null
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          status?: Database['public']['Enums']['user_status'] | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission']
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_permission: 'discussion_messages.delete' | 'direct_messages.delete' | 'inboxes.delete'
      app_role: 'client' | 'admin'
      user_status: 'ONLINE' | 'OFFLINE'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
