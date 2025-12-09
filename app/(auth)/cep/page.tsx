'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { ViaCepResponse } from '@/types/cep';
import { CepService } from '@/services/cep.service';
import { formatCep, cleanCep, isValidCep } from '@/lib/cep.utils';

export default function CepPage() {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState<ViaCepResponse | null>(null);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const clean = cleanCep(cep);

    if (!isValidCep(clean)) {
      toast.error('CEP deve conter 8 dígitos');
      return;
    }

    setLoading(true);
    setAddressData(null);

    try {
      const data = await CepService.searchCep(clean);

      if (!data) {
        toast.error('CEP não encontrado');
        setAddressData(null);
        return;
      }

      setAddressData(data);
      toast.success('CEP encontrado com sucesso!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro inesperado. Tente novamente.';
      toast.error(message);
      setAddressData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCep('');
    setAddressData(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg cep-gradient">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Busca de CEP</h1>
          </div>
          <p className="text-muted-foreground">
            Digite o CEP para buscar informações completas de endereço
          </p>
        </div>

        <Card className="shadow-lg animate-slide-up">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Consultar CEP</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={cep}
                    onChange={handleCepChange}
                    placeholder="00000-000"
                    maxLength={9}
                    disabled={loading}
                    className="text-lg h-11 transition-all focus:ring-2 focus:ring-primary"
                    data-cy="cep-input"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={loading || cep.length < 9}
                    className="flex-1 sm:flex-none min-w-[120px] h-11 transition-all hover:scale-105"
                    data-cy="search-cep-button"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Buscar
                      </>
                    )}
                  </Button>
                  {cep && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClear}
                      disabled={loading}
                      className="h-11 transition-all hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Limpar
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {addressData && (
          <Card 
            className="border-2 border-primary shadow-lg animate-slide-up bg-gradient-to-br from-background to-primary/5"
            data-cy="address-card"
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-primary text-xl">
                <div className="p-2 rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5" />
                </div>
                Endereço Encontrado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">CEP</p>
                  <p className="text-lg font-bold" data-cy="address-cep">{addressData.cep}</p>
                </div>
                <div className="space-y-1 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Logradouro</p>
                  <p className="text-lg font-bold" data-cy="address-logradouro">
                    {addressData.logradouro || 'Não informado'}
                  </p>
                </div>
                <div className="space-y-1 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Bairro</p>
                  <p className="text-lg font-bold">
                    {addressData.bairro || 'Não informado'}
                  </p>
                </div>
                <div className="space-y-1 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Complemento</p>
                  <p className="text-lg font-bold">
                    {addressData.complemento || 'Não informado'}
                  </p>
                </div>
                <div className="space-y-1 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Cidade</p>
                  <p className="text-lg font-bold" data-cy="address-city">{addressData.localidade}</p>
                </div>
                <div className="space-y-1 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Estado</p>
                  <p className="text-lg font-bold" data-cy="address-state">{addressData.uf}</p>
                </div>
                <div className="space-y-1 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">DDD</p>
                  <p className="text-lg font-bold">
                    {addressData.ddd || 'Não informado'}
                  </p>
                </div>
                <div className="space-y-1 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">IBGE</p>
                  <p className="text-lg font-bold">
                    {addressData.ibge || 'Não informado'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

